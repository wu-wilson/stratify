import type { Provider } from "./types";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";

export const providers: Provider[] = [
  {
    label: "Google",
    icon: FcGoogle,
    provider: new GoogleAuthProvider(),
    class: "google",
  },
  {
    label: "Twitter",
    icon: RiTwitterFill,
    provider: new TwitterAuthProvider(),
    class: "twitter",
  },
  {
    label: "GitHub",
    icon: TbBrandGithubFilled,
    provider: new GithubAuthProvider(),
    class: "github",
  },
];
