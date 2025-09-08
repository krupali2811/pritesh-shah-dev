import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from '../../routes/components/router-link';


// ----------------------------------------------------------------------

export function BreadcrumbsLink({ link, activeLast, disabled }) {
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'var(--bs-body-color)',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && { cursor: 'default', pointerEvents: 'none', color: 'var(--bs-secondary)', }),
  };

  const renderContent = (
    <>
      {link.icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg, & img': {
              width: 20,
              height: 20,
              color: 'var(--bs-secondary)',
            },
          }}
        >
          {link.icon}
        </Box>
      )}

      {link.name}
    </>
  );

  if (link.href) {
    return (
      <Link component={RouterLink} href={link.href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
