export default {
  name: 'spring',  // This name must match what's used in deskStructure
  title: 'Springs',
  type: 'document',
  preview: {
    select: {
      name: 'name',
      id: 'id'
    },

    prepare(selection: { name: any; id: any }){
      const {name, id} = selection
      const formattedId = id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`
      return {
        title: `${formattedId} ${name}`,
      }
    }
  },
  orderings:[
    {
      title: 'ID',
      name: 'byid',
      by: [
        {field: 'id', direction: 'asc'}
      ]
    }],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'Id',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          'Attica',
          'Central Greece',
          'Central Macedonia',
          'Crete',
          'Eastern Macedonia and Thrace',
          'Epirus',
          'Ionian Islands',
          'North Aegean',
          'Peloponnese',
          'South Aegean',
          'Thessaly',
          'Western Greece',
          'Western Macedonia',
        ],
      },
    },
    {
      name: 'municipality',
      title: 'Municipality',
      type: 'string',
    },
    {
      name: 'note',
      title: 'Note',
      type: 'string'
    },
    {
      name: 'properties',
      title: 'Properties',
      type: 'string',
      options: {
        list: [
          'Radon',
          'Alcaline',
          'Sulfur',
        ],
      },
    },
    {
      name: 'access',
      title: 'Access',
      type: 'string',
      options: {
        list: [
          'Open',
          'No access',
          'Unknown',
        ],
      },
    },
    {
      name: 'ownership',
      title: 'Ownership',
      type: 'object',
      fields: [
          { name: 'shortOption',
            type: 'string', 
            title: 'Filter Value',
            options: {
               list: [
              'Public',
              'Private',
              'Unknown',
            ],
          },
        }, 
          {
            type: 'string',
            name: 'longerOption',
            title: 'Displayed Value in Page',
          }
        ],
    },
    {
      name: 'treatment',
      title: 'Treatment',
      type: 'string',
      options: {
        list: [
          'Arthiritis',
          'Rashes',
        ],
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
