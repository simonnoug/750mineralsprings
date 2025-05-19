export default {
    name: 'marquee',
    title: 'Marquee Content', 
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', 'delete', 'publish'],
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        readOnly: true,
        hidden: true,
        initialValue: 'Marquee Content',
        description: 'This title is fixed for the Marquee page'
      },
      {
        name: 'content', 
        title: 'Content',
        type: 'text',
      },
      {
        name: 'link',
        title: 'Link to Event',
        type: 'reference',
        to: [{ type: 'event' }],
      }
    ]}