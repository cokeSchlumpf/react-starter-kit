'use strict';

import { GraphQLList as List } from 'graphql';

import { MeetupType } from '../types/EventType';

console.log(MeetupType)

const events = {
  type: new List(MeetupType),
  resolve() {
    return [
      {
        id: 1,
        title: 'Event 1',
        pitch: '...',
        description: '...',
        kind: 'MEETUP',
        date: 1234,
        duration: 2,
        location: {
          id: 1,
          name: 'IBM Munich',
          info: '...',
          street: 'street',
          zip: '12345',
          town: 'Munich',
          country: 'Germany'
        }
      }
    ];
  }
};

export default events;
