import { Screen } from '../../../src/models/screen';
import { ScreenContext } from '../../../src/interfaces/models/screen';

describe(':: models/screen | standard use-case', () => {
  let screenContext: ScreenContext;
  let screen: Screen;

  beforeEach(async () => {
    screenContext = {
      links: {
        reset_password: "/u/login/password-reset-start/db-connection?state=hKFo2SBBSUtGajljVmVYT1ktYXpqNzk0Mm1GQ3pJZFdxSnlGTKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHc0bTNTTXVWeWQ2S0NpSHhwMVo2UG1OWEc3b3ViRExfo2NpZNkgaXgxM29SUGNRT1FkQWJUSFZycjlLTjVSc2JNVHBBYnM",
        signup: "/u/signup/identifier?state=hKFo2SBBSUtGajljVmVYT1ktYXpqNzk0Mm1GQ3pJZFdxSnlGTKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHc0bTNTTXVWeWQ2S0NpSHhwMVo2UG1OWEc3b3ViRExfo2NpZNkgaXgxM29SUGNRT1FkQWJUSFZycjlLTjVSc2JNVHBBYnM"
      },
      name: "login-id",
      texts: {
        pageTitle: "Log in | spa-react",
        title: "Welcome",
        description: "Log in to tenant-nandan to continue to spa-react.",
        separatorText: "Or"
      }
    }
    screen = new Screen(screenContext);
  });

  it('should return the correct name', () => {
    expect(screen.name).toBe(screenContext.name);
  });

  it('should return the correct links', () => {
    expect(screen.links).toEqual(screenContext.links);
  });

  it('should return the correct texts', () => {
    expect(screen.texts).toEqual(screenContext.texts);
  });

  it.skip('should return the correct captcha', () => {
    expect(screen.captcha).toBe('captchaValue');
  });
});