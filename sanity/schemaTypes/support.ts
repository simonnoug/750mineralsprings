export default {
    name: 'support',
    title: 'Support Page', 
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', 'delete', 'publish'],
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        readOnly: true,
        hidden: true,
        initialValue: 'Support Page',
        description: 'This title is fixed for the Support page'
      },
      {
        name: 'membership', 
        title: 'Membership',
        type: 'array',
        of: [{ type: 'block' }]
      },
      {
        name: 'payment',
        title: 'Payment',
        type: 'array',
        of: [{ type: 'block' }]
      },
      {
        name: 'image',
        title: 'Image',
        type: 'imageWithCaption',
      }
    ]}