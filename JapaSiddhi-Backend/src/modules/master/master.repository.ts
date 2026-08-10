import mysql from '../../database/mysql';



class MasterRepository {


  async getCountries() {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        name,

        iso_code AS isoCode,

        phone_code AS phoneCode

      FROM countries

      WHERE is_active = 1

      ORDER BY name ASC
      `,
    );

  }



  async getStates(
    countryId:number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        country_id AS countryId,

        name

      FROM states

      WHERE country_id = ?

      AND is_active = 1

      ORDER BY name ASC
      `,
      [
        countryId,
      ],
    );

  }



  async getCities(
    stateId:number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        state_id AS stateId,

        name

      FROM cities

      WHERE state_id = ?

      AND is_active = 1

      ORDER BY name ASC
      `,
      [
        stateId,
      ],
    );

  }



  async getLanguages() {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        language_code AS code,

        language_name AS name,

        native_name AS nativeName,

        is_active AS isActive

      FROM languages

      WHERE is_active = 1

      ORDER BY language_name ASC
      `,
    );

  }


}


export default new MasterRepository();