import { StructureBuilder } from "sanity/structure"

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([

      // === Dynamic collections ===
      S.listItem()
        .title('Springs')
        .child(
          // Document list of type "spring"
          S.documentTypeList('spring').title('Springs')
        ),

      S.listItem()
        .title('Events')
        .child(
          S.documentTypeList('event').title('Events')
        ),

      S.listItem()
        .title('Friends')
        .child(
          S.documentTypeList('friend').title('Friends')
        ),
        

      S.divider(),

      // === Singleton pages ===
      S.listItem()
        .title('Home Page')
        .child(
          // Single-document editor for type "homePage"
          S.document()
            .schemaType('home')
            .documentId('homePage')
        ),

       S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('about')
            .documentId('aboutPage')
        ),
        S.listItem()
        .title('Support Page')
        .child(
          S.document()
            .schemaType('support')
            .documentId('supportPage')
        ),
        S.listItem()
        .title('Marquee Content')
        .child(
          S.document()
            .schemaType('marquee')
            .documentId('marqueeContent')
        )
    ])