import React, { ReactNode } from 'react'
import { LanguageSelector } from '../language-selector'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

interface IProps {
  leftNode?: ReactNode
}
export function Header({ minimal }: { minimal?: boolean }) {
  const id = localStorage.getItem('id')
  return (
    <div className="max-w-7xl p-2">
      {!minimal ? (
        <div className=" flex w-full items-center justify-between rounded-md border border-white px-4 py-2">
          <p className="text-gray-50">Dashboard</p>
          {/* LINKS */}
          <div className="hidden gap-4 sm:flex">
            <Link to={'/dashboard/' + id} className="text-sm text-white">
              Overview
            </Link>
            <Link to={'orders/' + id} className="text-sm text-white">
              Orders
            </Link>
            <Link to={'store/' + id} className="text-sm text-white">
              Stores
            </Link>
            <Link to={'/store-onboarding/' + id} className="text-sm text-white">
              Onboarding
            </Link>
            <p className="text-sm text-white">Notifications</p>
          </div>
          <div className="h-8 w-8 rounded-full border border-white"></div>
        </div>
      ) : (
        <div className=" mx-auto flex w-full max-w-5xl items-center justify-between rounded-md border border-white px-4 py-2 sm:px-6">
          <p className="text-gray-50">Diet Dining</p>
          <div className="flex items-center gap-x-2">
            <div className="flex flex-col">
              <span className="text-xs text-white">Logged in as</span>
              <span className="text-right text-xs text-white">Anthony</span>
            </div>
            <div className="h-8 w-8 rounded-full border border-white"></div>
          </div>
        </div>
      )}
    </div>
  )
}
