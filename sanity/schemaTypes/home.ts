// Example schema for regular pages
export default {
    name: 'home',
    title: 'Home Image', 
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
    fields: [
        {
          name: 'image', 
          title: 'Image Object',
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
      ]}