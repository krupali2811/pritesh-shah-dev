import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdChevronRight } from "react-icons/md";

import { BreadcrumbsLink } from "./breadcrumb-link";


// ----------------------------------------------------------------------

export function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  slotProps,
  sx,
  ...other
}) {
  const lastLink = links[links.length - 1].name;

  const renderHeading = <h2 className="dash-section-title mb-2">{heading}</h2>;

  const renderLinks = (
    <Breadcrumbs
      separator={<Separator />}
      sx={slotProps?.breadcrumbs}
      {...other}
    >
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          activeLast={activeLast}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );

  const renderAction = (
    <Box sx={{ flexShrink: 0, ...slotProps?.action }}> {action} </Box>
  );

  const renderMoreLink = (
    <Box component="ul">
      {moreLink?.map((href) => (
        <Box key={href} component="li" sx={{ display: "flex" }}>
          <Link
            href={href}
            variant="body2"
            target="_blank"
            rel="noopener"
            sx={slotProps?.moreLink}
          >
            {href}
          </Link>
        </Box>
      ))}
    </Box>
  );

  return (
    <Stack spacing={2} sx={sx}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}

          {!!links.length && renderLinks}
        </Box>

        {action && renderAction}
      </Stack>

      {!!moreLink && renderMoreLink}
    </Stack>
  );
}

// ----------------------------------------------------------------------

// function Separator() {
//   return (
//     <Box
//       component="span"
//       sx={{
//         width: 4,
//         height: 4,
//         borderRadius: '50%',
//         bgcolor: 'text.disabled',
//       }}
//     />
//   );
// }

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        color: "var(--bs-secondary)", // Match disabled text color from the theme
        fontSize: "20px", // Adjust size as needed
      }}
    >
      <MdChevronRight />
    </Box>
  );
}
