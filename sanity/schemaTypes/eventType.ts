export default {
  name: 'event',  // This name must match what's used in deskStructure
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
      name: 'id',
      title: 'Id',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
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
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithCaption'}],   
}]}
