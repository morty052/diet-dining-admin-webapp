import { useState } from 'react'

interface IProduct {
  name: string
  image: string
  description: string
  price: number
  status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'COMING_SOON' | string
}

type Props = {
  products?: IProduct[]
}

export function AddProductTable({ products }: Props) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: 0,
    status: 'AVAILABLE',
  })

  const [AddedProducts, setAddedproducts] = useState<[] | IProduct[]>([])

  const handleAddProduct = () => {
    console.log(newProduct)
    setAddedproducts((prev) => [...prev, newProduct])
    setNewProduct({
      name: '',
      image: '',
      description: '',
      price: 0,
      status: '',
    })
  }

  const handleTextChange = (name: any, text: string) => {
    setNewProduct((prev) => ({
      ...prev,
      [name]: text,
    }))
  }

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0])
    setNewProduct((prev) => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0]),
    }))
  }

  // return (
  //   <div>
  //     <Table>
  //       <TableCaption>Add new product.</TableCaption>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead className=" text-black">Name</TableHead>
  //           <TableHead className=" text-black">Image</TableHead>
  //           <TableHead className=" text-black">Description</TableHead>
  //           <TableHead className=" text-black">Price</TableHead>
  //           <TableHead className=" text-black">Preview</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody className=" divide-y">
  //         {AddedProducts?.map((product) => (
  //           <TableRow key={product.name} className="">
  //             <TableCell className=" text-black">{product.name}</TableCell>
  //             <TableCell className=" text-black">{product.image}</TableCell>
  //             <TableCell className=" text-black">{product.description}</TableCell>
  //             <TableCell className=" text-black">{product.price}</TableCell>
  //           </TableRow>
  //         ))}
  //         <TableRow className="">
  //           <TableCell className="border-x  text-black">
  //             <input
  //               value={newProduct.name}
  //               onChange={(e) => handleTextChange(e.target.name, e.target.value)}
  //               name="name"
  //               className="rounded-lg p-2 text-black"
  //               placeholder="Product Name"
  //               type="text"
  //             />
  //           </TableCell>
  //           <TableCell className="w-72 max-w-[250px] border-x text-black">
  //             {!newProduct.image ? (
  //               <input onChange={(e) => handleFileChange(e)} placeholder="file" type="file" />
  //             ) : (
  //               <img src={newProduct.image} className="w-full" />
  //             )}
  //           </TableCell>
  //           <TableCell className=" w-full border-x text-black">
  //             <textarea
  //               value={newProduct.description}
  //               name="description"
  //               rows={5}
  //               className=" w-full rounded-lg p-2 text-black"
  //               placeholder="product description"
  //               onChange={(e) => handleTextChange(e.target.name, e.target.value)}
  //             />
  //           </TableCell>
  //           <TableCell className="border-x text-right text-black">
  //             <input
  //               name="price"
  //               value={newProduct.price}
  //               onChange={(e) => handleTextChange(e.target.name, e.target.value)}
  //               className="rounded-lg p-2 text-black"
  //               placeholder="price"
  //               type="text"
  //             />
  //           </TableCell>
  //           <TableCell className=" border-x text-right text-black">
  //             <Button onClick={() => handleAddProduct()} className="bg-white text-black">
  //               Preview{' '}
  //             </Button>
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //   </div>
  // )

  return (
    <>
      {/* <p className="text-center text-2xl text-white">Add new product.</p> */}
      <div className=" mx-auto max-w-5xl grid-cols-2 items-start gap-x-8 pt-6 sm:grid">
        {/* Product form */}
        <div className=" flex max-w-2xl flex-col gap-y-4">
          <div className="flex flex-col">
            <label className="h-48 w-48 border" htmlFor="img">
              Select Product Image
            </label>
            <input id="img" onChange={(e) => handleFileChange(e)} type="file" className=" text-black" />
          </div>
          <div className="flex flex-col">
            <label className="text-white" htmlFor="">
              Enter Product Name
            </label>
            <input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="name"
              type="text"
              className="text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white" htmlFor="">
              Enter Product Description
            </label>
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="description"
              rows={4}
              className="rounded-lg p-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white" htmlFor="">
              Enter Product Price
            </label>
            <input
              value={newProduct.price}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="price"
              type="text"
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white" htmlFor="">
              Enter Product status
            </label>
            <input
              value={newProduct.status}
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="status"
              type="text"
              className="text-black"
            />
          </div>
        </div>
        {/* Product preview */}
        <div className=" flex max-w-2xl flex-col gap-y-4 ">
          {/* <p className="text-white">Preview</p> */}

          <div className="flex justify-end">
            <div className="h-48 w-48 border">
              <img src={newProduct.image} className=" h-full w-full object-contain " alt="" />
            </div>
          </div>

          <div className="flex justify-between border-b py-2">
            <p className="text-white">Product Name:</p>
            <p className="text-white">{newProduct.name}</p>
          </div>
          <div className="flex flex-col border-b py-2">
            <p className="text-white">Product Description:</p>
            <div className="h-24 rounded-lg border bg-white px-2">
              <p className="text-black">{newProduct.description}</p>
            </div>
          </div>
          <div className="flex justify-between border-b py-2">
            <p className="text-white">Product Price:</p>
            <p className="text-white">{newProduct.price}</p>
          </div>
          <div className="flex justify-between border-b py-2">
            <p className="text-white">Product Status:</p>
            <p className="text-white">{newProduct.status}</p>
          </div>
          {/* <Button className="bg-white text-black" onClick={() => handleAddProduct()}>
            Add Product
          </Button> */}
        </div>
      </div>
    </>
  )
}
