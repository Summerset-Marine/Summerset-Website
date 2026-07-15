import { defineField, defineType } from 'sanity'

export const faqEntry = defineType({
  name: 'faqEntry',
  title: 'FAQ Entry',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5, description: 'Write as plain text — this renders as schema-ready FAQ answer', validation: Rule => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Permanent Systems', 'Boat Lifts', 'Seasonal Systems', 'Installation Process', 'Pricing', 'Service & Repairs', 'General'] },
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  }
})
