export default {
    name: 'friend',
    title: 'Friends',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options:
            {
                list: [
                'Team',
                'Board',
                'Sulfur',
                'Iron',
                'Saline'
                ],
            },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'imageObject',
        type: 'object',
        fields: [
          {
            name: 'file',
            title: 'File',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'caption',
            title: 'Caption',
            type: 'string',
          },
        ],
        },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      }
  ]   
  }   
  