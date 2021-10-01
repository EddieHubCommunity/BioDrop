import React from 'react'
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import { FaPatreon } from 'react-icons/fa'

const icons = {
  youtube: {
    icon: <i className={'pi pi-youtube p-px-2'}></i>,
    color: '#FF0000',
  },
  twitter: {
    icon: <i className={'pi pi-twitter p-px-2'}></i>,
    color: '#1DA1F2',
  },
  github: {
    icon: <i className={'pi pi-github p-px-2'}></i>,
    color: '#151013',
  },
  facebook: {
    icon: <i className={'pi pi-facebook p-px-2'}></i>,
    color: '#1877F2',
  },
  discord: {
    icon: <i className={'pi pi-discord p-px-2'}></i>,
    color: '#5865F2',
  },
  slack: {
    icon: <i className={'pi pi-slack p-px-2'}></i>,
    color: '#000',
  },
  vimeo: {
    icon: <i className={'pi pi-vimeo p-px-2'}></i>,
    color: '#44ace6',
  },
  instagram: {
    icon: <AiFillInstagram size='20px' />,
    color: '#e95950',
  },
  linkedin: {
    icon: <AiFillLinkedin size='20px' />,
    color: '#0e76a8',
  },
  patreon: {
    icon: <FaPatreon size='20px' />,
    color: '#052d49',
  },
}
export default icons
