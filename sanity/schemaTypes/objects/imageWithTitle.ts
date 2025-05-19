export default {
    name: 'imageWithTitle',
    title: 'Image with Title',
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
                        name: 'title',
                        title: 'Title',
                        type: 'string',
                    },
            ]}