/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('logo.png')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html', language)}>Example</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'The automation code can be written in Swift and gets compiled and executed by Sake',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/2000px-Swift_logo.svg.png",
        imageAlign: 'top',
        title: 'Automation in Swift',
      },
      {
        content: 'Easily edit your `Sakefile.swift` using Xcode and leverage the syntax highlighting and code autocompletion. You can even run the tasks from there!',
        image: "http://macosicongallery.com/img/512/xcode-2015-03-13.png",
        imageAlign: 'top',
        title: 'Xcode',
      },
      {
        content: 'Sake supports using SPM dependencies from your Sakefile.swift easily',
        image: "https://raw.githubusercontent.com/dvdciri/daggraph/HEAD/img/icon.png",
        imageAlign: 'top',
        title: 'Dependencies',
      },
      // {
      //   content: 'Sake supports using SPM dependencies from your Sakefile.swift easily',
      //   // image: imgUrl('docusaurus.svg'),
      //   // imageAlign: 'top',
      //   title: 'Composability',
      // },
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>Open Source ❤️</h2>
    <MarkdownBlock>Sake is developed as an open source project under the [xcode.swift](https://github.com/xcodeswift) organization. If you are interested in contriguting you are welcome to dive in and help the project move forward. Xcode.swift is a diverse and inclusive open source organization responsible of developing other open source projects such as [xcproj](https://github.com/xcodeswift/xcproj).</MarkdownBlock>
  </div>
);

const TryOut = props => (
  <Block background="light">
    {[
      {
        content: "Sake can be easily installed in your system using <a href=\"httsp://brew.sh\">Homebrew</a>.\n```bash\nbrew install sake\n```\nOnce installed, it provides an easy to use CLI that you can explore by just calling `sake` from your terminal. Sake provides the following commands:\n```bash\nsake init # Initializes a Sakefile.swift\n```\n```bash\nsake generate-xcodeproj # Generates an Xcode project\n```\n```bash\nsake tasks # Prints all the tasks\n```\n```bash\nsake task xx # Executes task xx\n```\n",
        image: imgUrl('terminal.gif'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Sakefile = props => (
  <Block id="try">
    {[
      {
        content: 'Talk about trying this out',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'left',
        title: 'Sakefile.swift',
      },
    ]}
  </Block>
);

// const Description = props => (
//   <Block background="dark">
//     {[
//       {
//         content: 'This is another description of how this project is useful',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'right',
//         title: 'Description',
//       },
//     ]}
//   </Block>
// );

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        {/* <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a> */}
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <TryOut />
          <Sakefile />
          {/* <Description /> */}
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
