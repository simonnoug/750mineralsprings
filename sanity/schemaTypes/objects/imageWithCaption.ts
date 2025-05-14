export default {
    name: 'imageWithCaption',
    title: 'Image with Caption',
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
            ]}