'use strict';

import _ from 'lodash';
import { GraphQLObjectType as ObjectType, GraphQLEnumType as EnumType, GraphQLID as ID, GraphQLInterfaceType as InterfaceType, GraphQLInt as IntType, GraphQLString as StringType, GraphQLNonNull as NonNull } from 'graphql';

const EventTypeEnum = new EnumType({
  name: 'EventType',
  description: 'All possible types of events managed.',
  values: {
    MEETUP: {},
    HACKATHON: {},
    PROJECT: {}
  }
});

const RepeatTypeEnum = new EnumType({
  name: 'RepeatType',
  description: '',
  values: {
    NEVER: {},
    MONTHLY: {},
    WEEKLY: {},
    YEARLY: {}
  }
})

const LocationType = new ObjectType({
  name: 'Location',
  fields: {
    id: {
      type: new NonNull(ID)
    },
    name: {
      type: new NonNull(StringType)
    },
    info: {
      type: StringType
    },
    street: {
      type: new NonNull(StringType)
    },
    zip: {
      type: new NonNull(StringType)
    },
    town: {
      type: new NonNull(StringType)
    },
    country: {
      type: new NonNull(StringType)
    }
  }
});

const EventInterface = new InterfaceType({
  name: 'Event',
  fields: {
    id: {
      type: new NonNull(ID)
    },
    title: {
      type: new NonNull(StringType)
    },
    pitch: {
      type: StringType
    },
    description: {
      type: StringType
    },
    kind: {
      type: new NonNull(EventTypeEnum)
    }
  },
  resolveType(event) {
    switch (event.kind) {
      case 'MEETUP':
        return MeetupType;
        break;
      case 'HACKATHON':
        return HackathonType;
        break;
      case 'PROJECT':
        return ProjectType;
        break;
    }
  }
});

const HostedEventInterface = new InterfaceType({
  name: 'HostedEvent',
  fields: {
    date: {
      type: new NonNull(IntType),
      description: "The date and starttime of the event as timestamp."
    },
    repeat: {
      type: new NonNull(RepeatTypeEnum),
      description: "Is this event a regular one?"
    },
    duration: {
      type: new NonNull(IntType),
      description: "The expected duration of the event in hours."
    },
    location: {
      type: LocationType,
      description: "The location of the event."
    },
    remoteAccessUrl: {
      type: StringType,
      description: "The Meeting URL if it's an online event."
    }
  },
  resolveType(event) {
    switch (event.kind) {
      case 'MEETUP':
        return MeetupType;
        break;
      case 'HACKATHON':
        return HackathonType;
        break;
    }
  }
});

export const MeetupType = new ObjectType({
  name: 'Meetup',
  fields: _.assign({}, {
    foo: {
      type: StringType
    }
  }, EventInterface._typeConfig.fields, HostedEventInterface._typeConfig.fields),
  interfaces: [EventInterface, HostedEventInterface]
});

export const HackathonType = new ObjectType({
  name: 'Hackathon',
  fields: {
    foo: {
      type: StringType
    },
    interfaces: [EventInterface, HostedEventInterface]
  }
});

export const ProjectType = new ObjectType({
  name: 'Project',
  fields: {
    foo: {
      type: StringType
    },
    interfaces: [EventInterface]
  }
});
