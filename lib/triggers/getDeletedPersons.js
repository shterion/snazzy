/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

const request = require('request-promise');
const snazzy = require('./../actions/snazzy.js');
const config = require('./../../config/config');
const cfg = config.getEnvironment();

snazzy.createSession(cfg, async () => {
  const {apikey: apiKey} = cfg;
  const {mp_cookie: cookie} = cfg;
  const {path} = cfg;
  // let persons = [];

  const options = {
    uri: `${path}/mp_contact/json_respond/address_contactperson/json_mainview?&mp_cookie=${cookie}`,
    json: {
      'print_deleted_entries_only': true
    },
    headers: {
      'X-API-KEY': apiKey
    }
  };

  try {
    const persons = await request.post(options);
    let customUserFormat;
    let result = [];

    persons.content.forEach((person) => {
        customUserFormat = {
          rowid: person.rowid,
          firstname: person.firstname,
          name: person.name,
          email: person.email,
          for_rowid: person.for_rowid,
          same_contactperson: person.same_contactperson,
          title: person.title,
          salutation: person.salutation,
          date_of_birth: person.date_of_birth,
          private_street: person.private_street,
          private_zip_code: person.private_zip_code,
          private_town: person.private_town,
          private_country: person.private_country,
          house_post_code: person.house_post_code,
          fax: person.fax,
          phone: person.phone,
          mobile_phone: person.mobile_phone,
          private_mobile_phone: person.private_mobile_phone,
          private_phone: person.private_phone,
          private_email: person.private_email,
          facebook_url: person.facebook_url,
          linked_in_url: person.linked_in_url,
          twitter_url: person.twitter_url,
          googleplus_url: person.googleplus_url,
          youtube_url: person.youtube_url,
          url: person.url,
          skype: person.skype
        };

      result.push(customUserFormat);
    });
    console.log(JSON.stringify(result.length, undefined, 2));
    // console.log(JSON.stringify(persons.content[0], undefined, 2));
    return result;
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
});