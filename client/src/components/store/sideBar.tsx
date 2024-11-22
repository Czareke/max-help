"use client"
import React from 'react'
import { Product, CategoryStoring, DataFeed, FeedHistory, InventoryHistory, Settings } from './icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import TabButton from './tabButton';


const sideBar = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = usePathname();

  return (
      <div className='w-20'>
      <Link href='/product' className='col-span-1'>
        <TabButton
        name='Product'
        isSelected={path === '/product'}
        icon={<Product className='w-6 h-6 mx-auto ' />}
        />
      </Link>

      <Link href='/categorystoring' className='col-span-1'>
        <TabButton
        name='Category Storing'
        isSelected={path === '/categorystoring'}
        icon={<CategoryStoring className='w-6 h-6 mx-auto '/>}
        />
      </Link>

      <Link href='/inventoryinsight' className='col-span-1'>
        <TabButton
        name='Inventory Insight'
        isSelected={path === '/inventoryinsight'}
        icon={<InventoryHistory className='w-6 h-6 mx-auto '/>}
        />
      </Link>

      <Link href='/newdatafeed' className='col-span-1'>
        <TabButton
        name='New Data Feed'
        isSelected={path === '/newdatafeed'}
        icon={<DataFeed className='w-6 h-6 mx-auto '/>}
        />
      </Link>
      <Link href='/inventorymanagement' className='col-span-1'>
        <TabButton
        name='Invenory Management'
        isSelected={path === '/inventorymanagement'}
        icon={<DataFeed className='w-6 h-6 mx-auto '/>}
        />
      </Link>
      <Link href='/productviewing' className='col-span-1'>
        <TabButton
        name='Product Viewing'
        isSelected={path === '/productviewing'}
        icon={<DataFeed className='w-6 h-6 mx-auto '/>}
        />
      </Link>
      <div className='fixed bottom-14'>
        <Link href='/feedhistory' className='col-span-1'>
          <TabButton
          name='Feed History'
          isSelected={path === '/feedhistory'}
          icon={<FeedHistory className='w-6 h-6 mx-auto '/>}
          />
        </Link>
        <Link href='/settings' className='col-span-1'>
          <TabButton
          name='Setting'
          isSelected={path === '/settings'}
          icon={<Settings className='w-6 h-6 mx-auto '/>}
          />
        </Link>
      </div>

      
    </div>
    
  )
}

export default sideBar
