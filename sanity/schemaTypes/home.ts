import { image } from "framer-motion/client";
import imageWithCaption from "./objects/imageWithCaption";

// Example schema for regular pages
export default {
    name: 'home',
    title: 'Home Page', 
    __experimental_actions: [/*'create',*/ 'update', 'delete', 'publish'],
    type: 'document',
        fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string', 
            readOnly: true,
            hidden: true,
            initialValue: 'Home Content',
            description: 'This title is fixed for the Home page'
            },
        {
          name: 'image', 
          title: 'Image Object',
          type: 'imageWithCaption',
        },
      ]}