import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from '../../components'
import { useNewAffiliate } from '../../models/newAffiliate'
import { PhoneMockUp } from 'src/components/phone-mockup'
import StoreAddress from './routes/StoreAddress'
import StoreName from './routes/StoreName'
import StoreDescription from './routes/StoreDescription'
import StoreLogo from './routes/StoreLogo'
import StoreTags from './routes/StoreTags'
import CreateStoreScreen from './routes/CreateStoreScreen'
import StoreHeader from './routes/StoreHeader'

function Preview() {
  const { affiliate, previewHeader, previewLogo } = useNewAffiliate()

  const { store_name, store_description, store_address, tags } = affiliate

  const { street, city, province, postal_code } = store_address

  return (
    // <div className="hidden  py-16 sm:block">
    //   <p className="mb-4 text-xl font-semibold text-gray-400">Preview</p>
    //   <div className="relative h-full   ">
    //     <div className=" h-28 w-full border bg-white/60  ">
    //       {!previewHeader && <p className=" text-center">Vendor header</p>}
    //       <img
    //         className={`h-full w-full bg-no-repeat object-cover ${!previewHeader && 'hidden'}`}
    //         src={previewHeader}
    //         alt="background image"
    //       />
    //     </div>
    //     <div className="absolute left-4 top-10 z-10 flex h-20 w-20 items-center justify-center rounded-full border  ">
    //       {!previewLogo ? (
    //         <p className="m-2 mb-4 font-medium text-blue-400">Logo</p>
    //       ) : (
    //         <img className="h-full w-full  rounded-full object-cover" src={previewLogo} alt="" />
    //       )}
    //     </div>

    //     {/* DETAILS */}
    //     <div className="flex flex-col   pt-4 ">
    //       {/* STORE NAME */}
    //       <div className="flex items-center gap-x-1">
    //         <StoreIcon color="white" size={14} />
    //         <p className=" text-white">{!store_name ? 'Vendor display Name' : store_name}</p>
    //       </div>
    //       <div className="flex gap-x-2">
    //         {tags.map((tag, index) => (
    //           <div onClick={() => removeTag(tag)} key={tag} className="">
    //             <span className="text-xs text-white hover:text-red-400">{tag}</span>
    //             {index != tags.length - 1 && <span className="text-white"> -</span>}
    //           </div>
    //         ))}
    //       </div>
    //       {/* ADRESS */}
    //       <div className="flex items-center gap-x-1">
    //         <MapPin size={14} color="white" />
    //         <p className="text-white">
    //           {street} {!street && 'Street'}
    //         </p>
    //         <p className="text-white">
    //           {city} {!city && 'City'}
    //         </p>
    //         <p className="text-white">
    //           {province} {!province && 'State'}
    //         </p>
    //         <p className="text-white">
    //           {postal_code} {!postal_code && 'Postal Code'}{' '}
    //         </p>
    //       </div>
    //       {/* DESCRIPTION */}
    //       <div className="mt-4 h-32 rounded-lg border p-2">
    //         <p className="text-white">
    //           {!store_description ? 'Short note about your store will appear here' : store_description}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <PhoneMockUp />
  )
}

export function StoreOnboarding() {
  return (
    <div className="min-h-screen bg-black">
      <Header firstname="Abdul" minimal title="Vendor Onboarding" />

      <div className="mx-auto grid max-w-6xl  divide-x divide-gray-200/20 pt-10 md:grid-cols-2">
        <div className="max-w-screen-sm px-4 2xl:max-w-screen-md">
          <Routes>
            <Route path="/" element={<StoreName />} />
            <Route path="/description" element={<StoreDescription />} />
            <Route path="/image" element={<StoreHeader />} />
            <Route path="/logo" element={<StoreLogo />} />
            <Route path="/address" element={<StoreAddress />} />
            <Route path="/tags" element={<StoreTags />} />
            <Route path="/confirm" element={<CreateStoreScreen />} />
            {/* <Route path="/sendmail" element={<CreateStoreScreen />} /> */}
          </Routes>
        </div>
        <div className="px-4">
          <Preview />
        </div>
      </div>
    </div>
  )
}
