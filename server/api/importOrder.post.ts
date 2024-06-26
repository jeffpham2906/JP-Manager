import formidable from 'formidable'
import { promises as fs } from 'fs'
import { parse } from 'csv-parse'
import { supabase } from '../supabase'
import dayjs from 'dayjs'

interface RecordType {
  [key: string]: string
}

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: false })

  const { files } = await new Promise<{
    fields: formidable.Fields
    files: formidable.Files
  }>((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })

  if (!files?.file)
    return {
      status: 'error',
      message: 'Dont have file',
    }

  try {
    const file = files.file[0]
    // Read the uploaded file
    const fileContent = await fs.readFile(file.filepath, 'utf-8')

    // Parse the CSV data
    const records: RecordType[] = []
    const parser = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    })

    for await (const record of parser) {
      const filteredRecord = {
        order_id: record['Order ID'],
        product_name: record['Product Name'],
        variation: record['Variation'],
        seller_sku: record['Seller SKU'],
        quantity: record['Quantity'],
        created_time: new Date(
          dayjs(record['Created Time']).format('DD/MM/YYYY')
        ).toISOString(),
        buyer_message: record['Buyer Message'],
        buyer_name: record['Buyer Username'],
      }
      records.push(filteredRecord)
      const { error } = await supabase.from('order_products').insert(records)
      if (error) {
        throw new Error(error.message)
      }
      return {
        status: 200,
        message: 'OK',
        records,
      }
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: error?.message || 'Error format',
    }
  }
})
