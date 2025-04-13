export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'id',
      title: 'ID',
      type: 'number',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'springs',
      title: 'Springs',
      type: 'array',
      of: [
        {
          type: 'reference',
            to: [{type: 'spring'}],
        },
          ],
      description: 'The springs that are related to this event',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
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
        ],
    },
]   
}   
