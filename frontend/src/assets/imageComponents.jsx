import React, { memo } from 'react';
import { IMAGES } from './assetsImport';

export const Logo = memo(({ className, alt = "Sehpaathi Logo", ...props }) => (
  <img
    src={IMAGES.logo}
    alt={alt}
    className={className}
    {...props}
  />
));

export const DemoGif = memo(({ className, alt = "Sehpaathi Demo", ...props }) => (
  <img
    src={IMAGES.gif}
    alt={alt}
    className={className}
    {...props}
  />
));

export const TeamMember = memo(({ member, className, ...props }) => (
  <img
    src={IMAGES[member.toLowerCase()]}
    alt={`${member} profile`}
    className={className}
    {...props}
  />
));