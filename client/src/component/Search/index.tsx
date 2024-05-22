import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../../api/OpenWeatherService";
import { notify_error } from "../../App";

interface SearchProps {
  onSearchChange: (
    selectedCity: { value: string; label: string } | null
  ) => void;
}

interface CityOption {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const citiesList = await fetchCities(inputValue);
      console.log(citiesList);
      const options = citiesList.data.map((city: CityOption) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      });
      return { options };
    } catch (error) {
      notify_error();
      return { options: [] }; 
    }
  };

  const onChangeHandler = (
    enteredData: { value: string; label: string } | null
  ) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
