'use client';

import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useSidebar } from '../sidebar';

function SideBarFooter() {
  const router = useRouter();
  const { setUserDetails } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar() || {};

  const options = [
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
    },
    {
      name: 'Help',
      icon: HelpCircle,
      path: '/help',
    },
    {
      name: 'Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      action: () => {
        setUserDetails?.(null);
        router.push('/');
        console.log('User signed out');
      },
    },
  ];

  const onOptionClick = (option) => {
    if (option.action) {
      option.action();
    } else if (option.path) {
      router.push(option.path);
    } else {
      console.warn(`No action or path defined for ${option.name}`);
    }

    if (toggleSidebar) toggleSidebar();
  };

  return (
    <div className="p-2 mb-10">
      {options.map(({ name, icon: Icon, ...rest }, index) => (
        <Button
          onClick={() => onOptionClick({ name, icon: Icon, ...rest })}
          key={name || index}
          variant="ghost"
          className="w-full flex justify-start my-3 gap-2"
        >
          <Icon />
          {name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
