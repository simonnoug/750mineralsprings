import { s } from "framer-motion/client"
import { getNamelessWorkspaceIdentifier } from "sanity"

export default {
  name: 'friend',  // This name must match what's used in deskStructure
  title: 'Friend',
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
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      type: 'imageWithCaption',
      title: 'Image',
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
  ],
  
  preview: {
    select: {
      name: 'name',
      status:  'status'
    },
    prepare(selection:{ name: string, status: string }) {
      const {name, status} = selection
      return {
        title:name,
        subtitle: status,
      }
    }
  }
}

