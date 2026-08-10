export interface CountryResponse {

  id: number;

  name: string;

  isoCode: string;

  phoneCode: string;

}


export interface StateResponse {

  id: number;

  countryId: number;

  name: string;

}


export interface CityResponse {

  id: number;

  stateId: number;

  name: string;

}


export interface LanguageResponse {

  id: number;

  code: string;

  name: string;

  nativeName: string;

  isActive: boolean;

}