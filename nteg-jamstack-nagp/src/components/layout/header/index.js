import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSettings } from 'components/settings-context';
import IconUser from 'ui/icons/user';

import BurgerButton from './burger-button';
import BasketButton from './basket-button';
import LocaleSwitcher from './locale-switcher';
import Search from './search';
import {
  Outer,
  Nav,
  Btn,
  Logo,
  NavList,
  NavListItem,
  PreviewBar,
  IconBar
} from './styles';
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderButton = () => {
  if (typeof window !== "undefined") {
    return <Auth0Provider
      domain="nteg-jamstack.us.auth0.com"
      clientId="97Dk0Z9QgHkIM2hfJcSORtl1qBBCsLyn"
      redirectUri={window.location.origin}
    >
      <LoginButton></LoginButton>
    </Auth0Provider>;
  } else {
    return "";
  }
};

const LoginButton = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    const { loginWithRedirect } = useAuth0();
    return (<button onClick={() => loginWithRedirect()}>Log In</button>);
  } else {
    console.log(user);
    return (<div>{user.email}</div>);
  }
};



export default function Header({ simple, preview }) {
  const { mainNavigation } = useSettings();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  return (<div>

    <Outer simple={simple}>
      <Link href="/" passHref>
        <Logo aria-label="Logo">
          <img src="/static/shop-logo.svg" alt="" width="207" height="35" />
        </Logo>
      </Link>
      <Nav open={navOpen}>
        <NavList>
          {mainNavigation?.map((category) => (
            <NavListItem key={category.path}>
              <Link href={category.path}>
                <a onClick={() => setNavOpen(false)}>{category.name}</a>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
      <IconBar>
        {/* <LocaleSwitcher navOpen={navOpen} /> */}
        {/* <Link href="/account" passHref>
            <Btn as="a" aria-label="User area">
              <IconUser />
            </Btn>
          </Link> */}
        <Search />
        <BasketButton />
      </IconBar>
      <Auth0ProviderButton />
      <BurgerButton active={navOpen} onClick={() => setNavOpen(!navOpen)} />
    </Outer>
  </div>
    // </>
  );
}

// <>
    //     {preview && (
        //       <PreviewBar>
        //         You are in preview mode (
        //         <a href={'/api/preview?leave=' + encodeURIComponent(router.asPath)}>
        //           leave
        //         </a>
        //         )
        //       </PreviewBar>
        //     )}
