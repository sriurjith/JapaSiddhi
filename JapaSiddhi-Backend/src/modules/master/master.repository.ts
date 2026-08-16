import mysql from '../../database/mysql';



class MasterRepository {


  async getCountries() {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        name,

        iso2 AS isoCode,

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

        code,

        name,

        native_name AS nativeName,

        is_active AS isActive

      FROM languages

      WHERE is_active = 1

      ORDER BY display_order ASC, name ASC
      `,
    );

  }


}


export default new MasterRepository();