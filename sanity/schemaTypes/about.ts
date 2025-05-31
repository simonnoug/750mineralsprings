// Example schema for regular pages
export default {
  name: 'about',
  title: 'About Page', 
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', 'delete', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'About Page',
      description: 'This title is fixed for the About page'
    },
    {
      name: 'contact', 
      title: 'CONTACT',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'about',
      title: 'ABOUT',
      type: 'array',
      of: [{type: 'block'}],
    }
  ]}