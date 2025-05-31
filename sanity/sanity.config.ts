import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { deskStructure } from './deskStructure'
import { media } from 'sanity-plugin-media'


export default defineConfig({
  name: 'default',
  title: ' 750 Mineral Springs of Greece',

  projectId: 'g478zux8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
})
