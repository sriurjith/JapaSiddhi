import countries from 'world-countries';

export interface CountryItem {
  name: string;
  code: string;
  callingCode: string;
  flag: string;
}

const countryList: CountryItem[] = countries
  .map(country => ({
    name: country.name.common,
    code: country.cca2,
    callingCode:
      country.idd.root && country.idd.suffixes?.length
        ? `${country.idd.root}${country.idd.suffixes[0]}`
        : '',
    flag: country.flag,
  }))
  .filter(item => item.callingCode !== '')
  .sort((a, b) => a.name.localeCompare(b.name));

export default countryList;