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
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY.MM.DD',
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'date',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
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
