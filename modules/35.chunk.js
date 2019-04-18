(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"+SbY":function(e,t){e.exports='<html><head></head><body><p>Unit tests test the smallest level of functionality e.g. the result of executing a method. End-to-end (E2E) tests build on unit tests by combining units of code and testing that the resulting combination functions correctly. They test a particular feature for correctness by comparing the results for a given input against the specification e.g. &apos;pressing button X should result in checkbox Y becoming disabled&apos;.</p>\n<p>Protractor is an end-to-end, open source test framework for Angular. It uses the Jasmine framework by default and runs on top of Selenium WebDriver. Tests may be run against a local Selenium server or against a remote server e.g. a Selenium Grid system. Tests may be written in JavaScript and TypeScript.</p>\n<p>The UXAspects project includes a suite of E2E tests in the &apos;e2e&apos; folder of the project repository.</p>\n<h3 id="installation">Installation</h3>\n<p>Install <a href="https://nodejs.org/">Node.js</a>, which provides the npm package manager.</p>\n<p>Execute the command <code>npm install -g grunt-cli</code> to install the grunt command line interface.</p>\n<p>Follow the instructions in the &quot;Building from Source&quot; section in the <a href="https://uxaspects.github.io/UXAspects/#/gettingstarted">Getting Started</a> page of the UX Aspects documentation to build the components to be tested.</p>\n<p>Before the first test run, execute <code>./node_modules/.bin/webdriver-manager update</code> to download the binaries necessary to get an instance of the Selenium Server running.</p>\n<p>Execute the command <code>grunt e2e</code> to run the tests.</p>\n<h3 id="architecture">Architecture</h3>\n<p>All Protractor methods are asynchronous and return promises. WebDriver maintains a queue of pending promises called the control flow. Promises are queued and resolved in the order they were created in.</p>\n<p>In our tests, elements are located on the test page by using &apos;by.ID&apos; and &apos;by.CSS&apos; locators.</p>\n<p>The Protractor global elements() function takes a locator for an element and returns that element. When using CSS selectors as a locator, the shortcut $() notation may be used. For example, <code>checkbox1.$(&apos;div .ux-checked&apos;)</code> is the same as <code>checkbox1.element(by.css(&apos;div .ux-checked&apos;))</code>.</p>\n<p>Multiple DOM elements may be found using the global element.all() function. As with single elements, a shortcut notation, $$(), may be used. For example <code>textsContainer.$$(&apos;em&apos;).get(1)</code> is the same as <code>textsContainer.elements.all(by.css(&apos;em&apos;).get(1))</code> and returns the second of an array of &apos;em&apos; elements.</p>\n<h3 id="test-organisation">Test organisation</h3>\n<h4 id="html-files">HTML files</h4>\n<p>The components being tested are grouped in HTML pages under the e2e/pages folder.</p>\n<p>The tests to be run against these pages are found under the e2e/tests folder.</p>\n<p>The e2e/protractor.config.js configuration file defines the location of the test files to be executed (in the &apos;specs&apos; property) and the URL for the Selenium server. The browser the tests are to run in is defined in the &apos;capabilities&apos; property (at the moment tests are run only in Chrome).</p>\n<h4 id="page-objects">Page Objects</h4>\n<p>When writing Protractor tests, it is good practice to place information about the location of elements in &apos;page object&apos; files, separate from the definitions of the tests themselves.</p>\n<p>A page object is a class that serves as an interface to the UI page being tested. The tests then use the methods of this class whenever they need to interact with that page.</p>\n<p>Encapsulating this information in a separate file means that if the organization of the page being tested changes, only the code within the page object needs to change. The tests themselves can remain unchanged. In addition, the Protractor-specific terms used to locate elements on the page are restricted to the page object files, making the test specification files easier to read.</p>\n<h4 id="test-specifications">Test specifications</h4>\n<p>The test instructions themselves are written using Jasmine syntax in test specification files. The page object class is exported from the page object file and imported into the test specification file.</p>\n<h3 id="results">Results</h3>\n<p>A variety of reporter classes are available to format tests results. Our e2e project outputs results to XML and HTML files. Further information about the reporters may be obtained at <a href="https://github.com/larrymyers/jasmine-reporters">https://github.com/larrymyers/jasmine-reporters</a>.</p>\n<h3 id="example-test">Example Test</h3>\n<p>To illustrate the organization of our Protractor tests, here is a simplified version of the tests for our Checkbox component.</p>\n<h4 id="html-file-containing-components-to-be-tested">HTML file containing components to be tested</h4>\n<p>Some checkboxes and associated elements are displayed in the HTML file to be tested (<a href="https://github.com/UXAspects/UXAspects/blob/develop/e2e/pages/app/checkbox/checkbox.testpage.component.html">e2e\\pages\\app\\checkbox\\checkbox.testpage.component.html</a>).</p>\n<pre class="hljs">&lt;div&gt;\n    &lt;ux-checkbox id=&quot;checkbox1&quot; [(value)]=&quot;checkModel.option1&quot; [disabled]=&quot;disableCheck&quot; \n        [simplified]=&quot;simplified&quot;&gt;Option1\n    &lt;/ux-checkbox&gt;\n&lt;/div&gt;\n\n&lt;div&gt;\n    &lt;ux-checkbox id=&quot;checkbox2&quot; [(value)]=&quot;checkModel.option2&quot; [indeterminateValue]=&quot;indeterminateValue&quot;\n        [simplified]=&quot;simplified&quot;&gt;Option2\n    &lt;/ux-checkbox&gt;\n&lt;/div&gt;\n\n&lt;div&gt;\n    &lt;button  id=&quot;button1&quot; class=&quot;btn button-primary m-r-xs&quot; \n        (click)=&quot;disableCheck = !disableCheck&quot;&gt;\n        {{ disableCheck ? &apos;Click to enable Option1&apos; : &apos;Click to disable Option1&apos; }}\n    &lt;/button&gt;\n&lt;/div&gt;</pre>\n<h4 id="page-object-file">Page object file</h4>\n<p>The page object file for the tests defines an interface to be used to access the elements in the test page (<a href="https://github.com/UXAspects/UXAspects/blob/develop/e2e/tests/components/checkbox/checkbox.po.spec.ts">e2e\\tests\\components\\checkbox\\checkbox.po.spec.ts</a>).</p>\n<pre class="hljs">import { browser, element, by, ElementFinder } from &apos;protractor&apos;;\nexport class CheckBoxesPage {\n\n    getPage(): void {\n        browser.get(&apos;/checkboxes&apos;);\n    }\n\n    checkbox1 = element(by.id(&apos;checkbox1&apos;));\n    checkbox2 = element(by.id(&apos;checkbox2&apos;));\n    disableButton = element(by.id(&apos;button1&apos;));\n\n    confirmIsChecked(checkbox: ElementFinder) {    \n        return checkbox.$(&apos;div.ux-checked&apos;).isPresent();\n    }\n\n    confirmIsDisabled(checkbox: ElementFinder) {\n        return checkbox.$(&apos;div.ux-disabled&apos;).isPresent();\n    }\n}</pre>\n<h4 id="test-specification-file">Test specification file</h4>\n<p>The tests specification file (<a href="https://github.com/UXAspects/UXAspects/blob/develop/e2e/protractor.config.js">e2e\\tests\\components\\checkbox\\checkbox.e2e-spec.ts</a>) uses the page object class to access the elements on the page being tested. The tests use Jasmine syntax to check the values associated with elements (e.g. <code>&apos;expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy()&apos;</code>) and to perform operations on elements e.g. (<code>&apos;page.disableButton.click()&apos;</code>).</p>\n<pre class="hljs">import { browser, Key } from &apos;protractor&apos;;\nimport { CheckBoxesPage } from &apos;./checkbox.po.spec&apos;;\n\ndescribe(&apos;Checkbox Tests&apos;, () =&gt; {\n\n  let page: CheckBoxesPage;\n  let browserName: string;\n\n  beforeEach(() =&gt; {\n    page = new CheckBoxesPage();\n    page.getPage();\n  });\n\n  it(&apos;should have correct initial states&apos;, () =&gt; {    \n    // Initial values.\n    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();\n    expect(page.confirmIsChecked(page.checkbox2)).toBeFalsy();\n\n    // All enabled.\n    expect(page.confirmIsDisabled(page.checkbox1)).toBeFalsy();\n    expect(page.confirmIsDisabled(page.checkbox2)).toBeFalsy();\n  });\n\n  it(&apos;should react to clicks&apos;, () =&gt; {\n    page.checkbox2.click();\n    expect(page.confirmIsChecked(page.checkbox2)).toBeTruthy();\n    page.checkbox1.click();\n    expect(page.confirmIsChecked(page.checkbox1)).toBeFalsy();\n  });\n\n  it(&apos;should react to disabling&apos;, () =&gt; {\n    page.disableButton.click();\n    expect(page.confirmIsDisabled(page.checkbox1)).toBeTruthy();\n    page.checkbox1.click();\n    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();\n  });\n}</pre>\n<h3 id="further-reading">Further reading</h3>\n<p>More details about Protractor may be obtained at <a href="http://www.protractortest.org/#/toc">http://www.protractortest.org/#/toc</a>.</p>\n</body></html>'},"0Aa4":function(e,t,n){e.exports='<html><head></head><body><p>If you have started working with Angular and TypeScript one of the first things you notice is how much the tooling has improved when compared to writing apps in AngularJS and plain JavaScript. It brings many benefits such as early error detection, scalability and a productivity boost. With Type Definitions for nearly all major third party libraries the editor is now able to prompt you with contextually aware suggestions and often documentation on that function without leaving the editor. You get all these features as standard in editors such as VS Code, but there are many extensions available for the most popular editors that can further improve productivity and developer experience using Angular.</p>\n<h3 id="1-angular-language-service">1. Angular Language Service</h3>\n<p>The Angular Language Service is an extension being developed by the Angular team and provides some incredibly useful features. The extension is aware of when you are working in a component template file and will provide you with auto complete suggestions, error checking and the ability to Ctrl+Click on a component, variable or function and jump to the implementation or declaration. It is also aware what component selectors are available and all of the inputs and outputs available on each element.</p>\n<br>\n<img src="'+n("oP7J")+'">\n<br>\n<br>\n\n<h3 id="2-angular-v4-typescript-snippets">2. Angular v4 TypeScript Snippets</h3>\n<p>When creating an Angular application you will notice that there are certain bits of code that you end up typing over and over again, in particular things like NgModule, Component and Directive decorators. To speed up this process the Angular v4 TypeScript Snippets extension allows you to easily create this boilerplate code for you.</p>\n<br>\n<img src="'+n("VVeB")+'">\n<br>\n<br>\n\n<h3 id="3-path-intellisense">3. Path Intellisense</h3>\n<p>One thing that becomes very common when creating Angular components is having to provide relative file paths for templates and stylesheets, but this is also common when adding images in HTML and CSS rules.</p>\n<p>With the Path Intellisense plugin, the editor will display the list of files and folders in the directory and will update to show the appropriate results as you change the file path.</p>\n<br>\n<img src="'+n("CKFz")+'">\n<br>\n<br>\n\n<h3 id="4-tslint">4. TSLint</h3>\n<p>TSLint is both an extension for your editor and a node module. It allows you to define a set of rules about how developers should write their code, making it consistent throughout the entire codebase. The editor extension will check your code as you type it, inform you of anything that doesn&apos;t conform to the rules and the editor can often provide you with auto-fix functionality. TSLint can run as part of a build process to ensure that code meets the expected standard before the build will be successful.</p>\n<p>In addition to this, you can add further rules describing how Angular components should be written by adding Codealyzer to your project.</p>\n<br>\n<img src="'+n("ga16")+'">\n<br>\n<br>\n</body></html>'},CKFz:function(e,t,n){e.exports=n.p+"assets/path-intellisense.gif"},CQQO:function(e,t){e.exports="<html><head></head><body><p>You might be asking yourself, why should I use UX Aspects? How do I benefit from using UX Aspects in my project?\nWell, UX Aspects has many features that would prove to be advantageous to your project, be it big or small.\nWe bundle together numerous useful components that can form as the base of your project, and if you wish to use components that are responsive with a unique UX design you are in the right place.</p>\n<p>By just navigating through the Components section, you will undoubtedly come across features that will make you think &quot;If only I had seen this before!&quot;.\nLet&#x2019;s say you need a neat and tidy way of displaying a summary of user details for a list of users. In this case you could benefit from the Flippable Cards component which provides a way of displaying information without taking up unnecessary screen space. All you need to do is choose what you want the front and the back of your card to contain, and by hovering or clicking the card, you can see both sides.</p>\n<p>What if you need to provide some sort of notifications to users? This could be tricky and time consuming to implement yourself, but with UX Aspects we already have a solution for you. The Notifications component provides a method of displaying dismissible notifications on screen, with slick animations for when the notifications appear and disappear. You have many options to choose from to suit your needs. You can provide an icon for the notification, choose the duration for which notifications appear, display notifications as a badge etc.  </p>\n<p>Need a popup wizard to guide end users through a set of steps? No problem, why not implement the Marquee Wizard? With hooks to validation, you can provide your own validation methods to decide whether or not the user can continue to the next step. </p>\n<p>These are just a few of the components you can use to display information to end users in a seamless UX design. There are many more!</p>\n</body></html>"},LM6a:function(e,t){e.exports='<html><head></head><body><p>Angular makes the process of writing single page applications easy with a vast array of useful directives that often negate the need to write any JavaScript at all. However, when pages start to get complex and there are large amounts of data being shown, whether in table form or visually impressive charts, things can begin to slow down and it is often very easy to just blame the framework. While this could be the case, it is much more likely slow code in the application.</p>\n<p>Although modern machines often have impressive specs, JavaScript is largely single threaded (with the exception of WebWorkers) and with browsers running at 60 FPS, this gives us ~16ms to run any code in a given frame. On top of that the browser can take ~8ms of that time to calculate layout and render any changes, leaving us with approximately 8ms to work with. If we can&#x2019;t manage to do everything in that time frame the browser will start dropping frames which can result in a bad user experience.\nThere are certain things we can do to ensure Angular performs as quickly as it possibly can.</p>\n<h4 id="one-time-bindings">One Time Bindings</h4>\n<p>Any time we provide an Angular directive with a value, it can watch that value for any changes, which is great, as this provides us with a hassle free way to keep our model and view in sync. However in many occasions our data may be immutable, but Angular isn&#x2019;t aware of this and each time a digest cycle is run, Angular is checking to see if that value has changed when it really doesn&apos;t need to. As of Angular 1.3, we can now use one-time bindings, which will provide the directive with an initial value, but will not check again to see if it has changed. To use this feature simply add two colons before any value passed to a directive eg:</p>\n<pre class="hljs">&lt;p ng-bind=&quot;::vm.message&quot;&gt;&lt;/p&gt;</pre>\n<h4 id="avoid-interpolation">Avoid Interpolation</h4>\n<p>Angular provides us with a great way to add values from our controller or scope into the view through interpolation. An example of this could be:</p>\n<pre class="hljs">&lt;h1&gt;{{ vm.myHeading }}&lt;/h1&gt;</pre>\n<p>While very useful, and sometimes unavoidable, interpolation is slow and can often be improved by using <code>ng-bind</code> instead.</p>\n<h4 id="track-by">Track By</h4>\n<p>When using the <code>ng-repeat</code> directive consider adding a &#x201C;track by&#x201D; key. By adding this, any time the data changes it can determine which items where previously visible and will not create a new element for that item, reducing the amount of DOM manipulation occurring and can significantly reduce the amount of garbage collection the browser needs to do.</p>\n<pre class="hljs">&lt;tr ng-repeat=&quot;item in vm.items track by item.id&quot;&gt;</pre>\n<h4 id="-digest-vs-apply">$digest vs $apply</h4>\n<p>Most of the time any changes to data in the application will automatically be detected by Angular and the view will be updated, however there can be occasions where this won&apos;t happen automatically, such as when modifying data in a <code>setTimeout</code> callback. To manually inform Angular that there have been changes we can use <code>$scope.$apply()</code> or <code>$scope.$digest()</code>. Both of these may appear to do the same thing on the surface, but behind the scenes they are quite different and knowing when to use each one can bring quite a few performance benefits to your application.</p>\n<p><code>$scope.$digest()</code> will begin a digest cycle on the current scope, whereas <code>$scope.$apply()</code> is essentially an alias for <code>$rootScope.$digest()</code>. Once you realize this, you can see that <code>$scope.$digest()</code> will limit the dirty checking to the current scope only, reducing the number of checks significantly. Alternatively <code>$scope.$apply()</code> will check everything on the page, making it a much more expensive operation, so where possible it is always better to use <code>$digest</code> over <code>$apply</code>.</p>\n<h4 id="ng-show-vs-ng-if">ng-show vs ng-if</h4>\n<p>When it comes to showing and hiding DOM elements, Angular gives us two options in the form of <code>ng-if</code> and <code>ng-show</code> (or <code>ng-hide</code>). The <code>ng-show</code> directive will hide the element through styling, by setting <code>display</code> to <code>none</code>. The <code>ng-if</code> directive on the other hand will remove the element from the DOM entirely and as well as that will remove any watchers on the element and its children. Due to this fact it is often more performant to use <code>ng-if</code> where possible as this avoids performing updates on elements that are not visible to the user.</p>\n<h4 id="profiling">Profiling</h4>\n<p>Chrome Dev Tools provides excellent facilities to determine what parts of your code are running slowly. The timeline tab allows you to record all code execution and see the time each function took to run.</p>\n<p>There are also several Chrome extensions that can help identify issues:</p>\n<ul>\n<li><p><a href="https://chrome.google.com/webstore/detail/angular-performance/hejbpbhdhhchmmcgmccpnngfedalkmkm">Angular Performance</a></p>\n</li>\n<li><p><a href="https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en">Angular Batarang</a></p>\n</li>\n<li><p><a href="https://chrome.google.com/webstore/detail/angularjs-inspect-watcher/gdfcinoagafkodbnkjemaajfahnmfkhg">NG Inspect Watchers</a></p>\n</li>\n<li><p><a href="https://chrome.google.com/webstore/detail/web-tracing-framework/gmdhhnlkjmknaopofnadmoamhmnlicme">Web Tracing Framework</a></p>\n</li>\n</ul>\n</body></html>'},U9vh:function(e,t,n){e.exports=n.p+"assets/social.jpg"},VVeB:function(e,t,n){e.exports=n.p+"assets/angular-snippets.gif"},ZjG6:function(e,t){e.exports='<html><head></head><body><p>Forms and Inputs come with a lot of built-in validation for types such as <code>number</code>, <code>email</code> etc. Angular also provides directives for validation such as <code>ng-required</code>, <code>ng-minlength</code>, <code>ng-maxlength</code>, etc. These can be very useful when validating user input, for example, if you specify that an input is of type <code>email</code> the input field will be invalid until a valid email address has been entered.</p>\n<pre class="hljs">&lt;input type=&quot;email&quot; ng-model=&quot;vm.emailAddress&quot; name=&quot;emailInput&quot; placeholder=&quot;Enter your email address&quot;/&gt;</pre>\n<p>While this is very useful and allows you to perform a lot of validation there are constraints if you wish to apply complex validation, for example, if you want to validate that an id exists within a set of value. This is when it becomes useful to implement your own validation functions to the <code>$validators</code> object on the <code>ngModelController</code>. </p>\n<h4 id="-validators-object">$validators object</h4>\n<p>To access the <code>$validators</code> object of an input you must first ensure that your <code>input</code> tag is placed within a <code>form</code> tag and that both the input and form have been named accordingly. You must then inject <code>$scope</code> to your controller and you will then be able to access the <code>$validators</code> property by watching your <code>form</code> on the <code>$scope</code> and attaching the new validator when it is ready.\nYou know when it is ready by checking the <code>newValue</code> of the watch and if it exists then we check if our custom validator function already exists and if not we can add our own new function.</p>\n<p>You can see this in the example below. We access the <code>$validators</code> property by <code>formName.inputName.$validators</code> and then attach our own new validation function to this. This function will be called with <code>modelValue</code> and <code>viewValue</code> as parameters every time the <code>ngModel</code> of the input changes.</p>\n<p>If the input is valid the function should return <code>true</code>, otherwise it should return <code>false</code>.</p>\n<pre class="hljs">$scope.$watch(&apos;vm.myForm&apos;, function(form) {\n    if (form &amp;&amp; !form.myInput.$validators.myCustomValidator) { \n        form.testInput.$validators.myCustomValidator = function(modelValue, viewValue) {\n            if (validValues.indexOf(viewValue) === -1) return false;\n\n            return true;\n        };\n    }\n});</pre>\n<h4 id="adding-styling-depending-on-validity">Adding styling depending on validity</h4>\n<p>When the input is invalid it will have an <code>.ng-invalid</code> class as well as an <code>.ng-invalid-my-custom-validator</code> class (depending on what your named your validator on the <code>$validators</code> object). You can then apply styling accordingly.</p>\n<pre class="hljs">input.ng-invalid-my-custom-validator {\n    border: 1px solid red;\n}</pre>\n<p>You can also check <code>$error</code> property on the input <code>ngModel</code> for your custom validation and if is invalid it will be <code>true</code>, otherwise it will be <code>false</code>.</p>\n<pre class="hljs">&lt;p ng-show=&quot;vm.myForm.myInput.$error.myCustomValidator&quot;&gt;THERE IS AN ERROR&lt;/p&gt;</pre>\n<blockquote>\n<p>It is best practice to name the Form on your controller scope (i.e. <code>vm</code>) as doing otherwise my result in the form being attached to the scope of a different directive.</p>\n</blockquote>\n<p>For full documentation visit the <a href="https://docs.angularjs.org/guide/forms">Forms</a> and <a href="https://docs.angularjs.org/api/ng/type/ngModel.NgModelController">ngModelController</a> pages.</p>\n</body></html>'},dsgr:function(e,t){e.exports="<html><head></head><body><p>CSS3.0 and AngularJS facilitate eye-catchy, responsive and light-weight user experiences.\nUX Aspects has made optimal use of these technologies, for over an year!</p>\n<p>With rich Angular components providing seamless integration for your big data applications.\nUX Aspects takes immense pride in its agile development process, which facilitates its successful evolution.</p>\n<p>While UX Aspects continuously updates itself with latest advances in responsive design, the core idea of UX Aspects is to be a <strong>&#x201C;Developer&#x2019;s Friend&#x201D;</strong>.\nThe velocity at which these standard components help build complex responsive applications is a true differentiator for any team.</p>\n<p>The integration of &#x2018;Edit in Code Pen&#x2019; feature in UX Aspects creates a developer canvas for testing and updating code.\nThis encourages test-driven development and will prove to be a developer&#x2019;s delight for building bug free code at lightning speed.</p>\n<p>UX Aspects takes into account the expansive landscape of big data application development in our Company.\nThe &#x2018;Customize&#x2019; functionality lends itself to brand specific theme building. The one-stop theme builder creates consistent design for any client application.</p>\n<p>Armed with right core idea, integrated with advances in UX technologies, with an eye for customization, the agile UX Aspects is primed to power anything that comes it&apos;s way!</p>\n</body></html>"},gJRS:function(e,t,n){e.exports='<html><head></head><body><p>When building any large web application nowadays it is highly likely that you will use a bundling tool. Tools like Webpack bring some great benefits and optimizations such as Tree Shaking to remove any code that isn&apos;t used and code splitting to intelligently split code into different scripts so they can be lazy loaded only when they are needed, improving your page load times. Angular&apos;s router works extremely well with code splitting and can handle all the lazy loading for you.</p>\n<p>It is commonplace in JavaScript to use many libraries and frameworks in your application and the size of your bundle can grow quite quickly. It can be difficult to easily identify what your bundle actually contains and determine what libraries are increasing the output size.</p>\n<p>To help with this Webpack gives us a few useful tools. First we can output all the information about our Webpack build by passing the <code>--json</code> flag and streaming the output to a file. This can be done by using the following code:</p>\n<br>\n\n<pre class="hljs">webpack <span class="hljs-comment">--json &gt; stats.json</span></pre><br>\n\n\n<p>Next we can go to <a href="https://chrisbateman.github.io/webpack-visualizer/">https://chrisbateman.github.io/webpack-visualizer/</a> which is an online tool to visualize the contents of your bundle. Simply select the JSON file we just created and it will show you the contents of your bundle with more detail once you hover over a segment. <em>Note, if nothing happens when you choose the file, ensure that the stats.json file contains valid JSON as some loaders print output which can cause problems.</em></p>\n<br>\n\n<img src="'+n("szSE")+'">\n\n<br>\n\n<p>In the example image above you can see we have imported the entire RxJS library, adding 677.9KB to our build output. By importing only the things we need from the RxJS library we can take advantage of Tree Shaking. After we make the optimizations we can clearly see the difference.</p>\n<br>\n\n<img src="'+n("rxUZ")+'">\n\n<br>\n\n<p>Additionally Webpack offers its own online tool for analyzing bundles in more depth. This service can be found at <a href="http://webpack.github.io/analyse/">http://webpack.github.io/analyse/</a>.</p>\n<br>\n\n<img src="'+n("rNrS")+'">\n</body></html>'},ga16:function(e,t,n){e.exports=n.p+"assets/tslint.gif"},iKFx:function(e,t,n){e.exports='<html><head></head><body><p>When working with big data we quickly find ourselves with large volumes of data which holds key information. In order to make use of this data we need a way to analyse and present it in a way that allows us to make critical decisions. Using charts and graphs to visualize this data provides a quick and easy way to understand the data and can be used to highlight areas that need attention, identify key trends and predict how things will change in the future.</p>\n<p>It is important to remember that not all data should be visualized in the same way. In many cases what works for one data set will not accurately convey the information for another data set. For this reason UX Aspects provides a range of different visualization tools in the <a href="https://uxaspects.github.io/UXAspects/#/charts/bar-charts">charts section</a>. </p>\n<p>These cover simple bar charts, line charts and donut charts as well as some more specific charts such as the partition map, which is useful for displaying files in a repository, the organization chart, used for displaying the hierarchy of your organization, and the social chart for displaying social interactions between users. </p>\n<div class="row">\n    <img class="col-md-6" src="'+n("nkSY")+'">\n    <img class="col-md-6" src="'+n("U9vh")+'">\n</div>\n\n<p>UX Aspects also provides a <a href="https://uxaspects.github.io/UXAspects/#/components/utilities#color-service">color service</a> which allows you to quickly and easily update the colors on your charts to give your application that personal touch.</p>\n<p>This is just a small overview of some of the data visualization tools UX Aspects offers to help you get the most out of your data, check out our documentation sections to preview these components in action and find out how to use them in your own application.</p>\n</body></html>'},nkSY:function(e,t,n){e.exports=n.p+"assets/sankey.jpg"},oP7J:function(e,t,n){e.exports=n.p+"assets/angular-language-service.gif"},rNrS:function(e,t,n){e.exports=n.p+"assets/bundle-analysis.jpg"},rxUZ:function(e,t,n){e.exports=n.p+"assets/webpack-visualizer-2.jpg"},szSE:function(e,t,n){e.exports=n.p+"assets/webpack-visualizer.jpg"},zvoP:function(e,t,n){"use strict";n.r(t);var o=n("CcnG"),a=function(){function e(e){this.domSanitizer=e,this.posts=[{title:"Data Visualization with UX Aspects",author:"Alastair McKee",category:"Technical",datestamp:"October 17th",content:n("iKFx")},{title:"End-to-end testing using Protractor",author:"Pearse McMurray",category:"Technical",datestamp:"August 24th",content:n("+SbY")},{title:"Angular Productivity",author:"Ashley Hunter",category:"Technical",datestamp:"May 25th",content:n("0Aa4")},{title:"Bundle Optimization",author:"Ashley Hunter",category:"Technical",datestamp:"May 25th",content:n("gJRS")},{title:"Custom Validation Functions",author:"Gavin Neeson",category:"Technical",datestamp:"Jan 27th",content:n("ZjG6")},{title:"UX Aspects Components - a tidy UX design",author:"Gavin Neeson",category:"Technical",datestamp:"Oct 10th",content:n("CQQO")},{title:"Angular Performance Tips",author:"Ashley Hunter",category:"Technical",datestamp:"Oct 10th",content:n("LM6a")},{title:"Power of UX Aspects",author:" Gita Narasimhan",category:"Technical",datestamp:"Oct 9th",content:n("dsgr")}],this.posts.forEach(function(t){t.content=e.bypassSecurityTrustHtml(t.content)})}return e.prototype.togglePost=function(e,t){e.expanded=!e.expanded,t.preventDefault()},e}(),i=function(){return function(){}}(),s=n("WmtN"),l=n("CfOV"),r=n("pMnS"),c=n("GBPT"),d=n("unTc"),p=n("umu3"),h=n("f/B4"),u=n("Ip0R"),m=n("ZYjt"),g=o["\u0275crt"]({encapsulation:2,styles:[[".blog-post-box{border-bottom:2px solid #00a7a2}.blog-post-title{font-size:2rem;margin-bottom:0}.blog-post-info{display:inline-block;color:#999;font-weight:300;font-size:1.125rem}.blog-post-info .blog-post-author{color:#666}.blog-post-info .blog-post-separator{vertical-align:text-bottom;font-weight:600}.blog-post-category{display:inline-block;float:right}.blog-post-expand-link{display:inline-block;margin:5px 0}.blog-post-content>*{display:none!important}.blog-post-content.blog-post-content-expanded>*,.blog-post-content>:first-child{display:inherit!important}"]],data:{}});function f(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,34,"ux-ebox",[["class","blog-post-box"]],null,null,null,l.Ab,l.o)),o["\u0275did"](1,49152,null,0,d.nb,[],null,null),(e()(),o["\u0275ted"](-1,null,["\n                \n                "])),(e()(),o["\u0275eld"](3,0,null,0,20,"ux-ebox-header",[],null,null,null,null,null)),o["\u0275did"](4,16384,null,0,d.pb,[],null,null),(e()(),o["\u0275ted"](-1,null,["\n                    "])),(e()(),o["\u0275eld"](6,0,null,null,1,"h3",[["class","blog-post-title"]],null,null,null,null,null)),(e()(),o["\u0275ted"](7,null,["",""])),(e()(),o["\u0275ted"](-1,null,["\n                    "])),(e()(),o["\u0275eld"](9,0,null,null,7,"p",[["class","blog-post-info"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["by "])),(e()(),o["\u0275eld"](11,0,null,null,1,"span",[["class","blog-post-author"]],null,null,null,null,null)),(e()(),o["\u0275ted"](12,null,["",""])),(e()(),o["\u0275ted"](-1,null,[" "])),(e()(),o["\u0275eld"](14,0,null,null,1,"span",[["class","blog-post-separator"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["."])),(e()(),o["\u0275ted"](16,null,[" ",""])),(e()(),o["\u0275ted"](-1,null,["\n                    "])),(e()(),o["\u0275eld"](18,0,null,null,4,"div",[["class","blog-post-category"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n                        "])),(e()(),o["\u0275eld"](20,0,null,null,1,"div",[["class","label label-accent"]],null,null,null,null,null)),(e()(),o["\u0275ted"](21,null,["",""])),(e()(),o["\u0275ted"](-1,null,["\n                    "])),(e()(),o["\u0275ted"](-1,null,["\n                "])),(e()(),o["\u0275ted"](-1,null,["\n\n                "])),(e()(),o["\u0275eld"](25,0,null,1,8,"ux-ebox-content",[],null,null,null,null,null)),o["\u0275did"](26,16384,null,0,d.ob,[],null,null),(e()(),o["\u0275ted"](-1,null,["\n                    "])),(e()(),o["\u0275eld"](28,0,null,null,0,"div",[["class","blog-post-content"]],[[2,"blog-post-content-expanded",null],[8,"innerHTML",1]],null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n\n                    "])),(e()(),o["\u0275eld"](30,0,null,null,2,"a",[["class","hyperlink-toggle blog-post-expand-link"],["href",""]],null,[[null,"click"]],function(e,t,n){var o=!0;return"click"===t&&(o=!1!==e.component.togglePost(e.context.$implicit,n)&&o),o},null,null)),o["\u0275did"](31,212992,null,0,d.Ff,[o.ElementRef,d.gc,d.c,o.ChangeDetectorRef,[2,d.Gf]],null,null),(e()(),o["\u0275ted"](32,null,["",""])),(e()(),o["\u0275ted"](-1,null,["\n                "])),(e()(),o["\u0275ted"](-1,null,["\n\n            "]))],function(e,t){e(t,31,0)},function(e,t){e(t,7,0,t.context.$implicit.title),e(t,12,0,t.context.$implicit.author),e(t,16,0,t.context.$implicit.datestamp),e(t,21,0,t.context.$implicit.category),e(t,28,0,t.context.$implicit.expanded,t.context.$implicit.content),e(t,32,0,t.context.$implicit.expanded?"Show less":"Show more")})}function b(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,1,"uxd-page-header",[["description","Discussions and announcements from the UX Aspects team"],["header","Blog"]],null,null,null,p.b,p.a)),o["\u0275did"](1,49152,null,0,h.a,[],{header:[0,"header"],description:[1,"description"]},null),(e()(),o["\u0275ted"](-1,null,["\n\n"])),(e()(),o["\u0275eld"](3,0,null,null,10,"div",[["class","container"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n    "])),(e()(),o["\u0275eld"](5,0,null,null,7,"div",[["class","row"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n        "])),(e()(),o["\u0275eld"](7,0,null,null,4,"div",[["class","col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0 m-t"]],null,null,null,null,null)),(e()(),o["\u0275ted"](-1,null,["\n            \n            "])),(e()(),o["\u0275and"](16777216,null,null,1,null,f)),o["\u0275did"](10,278528,null,0,u.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),o["\u0275ted"](-1,null,["\n\n        "])),(e()(),o["\u0275ted"](-1,null,["\n    "])),(e()(),o["\u0275ted"](-1,null,["\n"]))],function(e,t){var n=t.component;e(t,1,0,"Blog","Discussions and announcements from the UX Aspects team"),e(t,10,0,n.posts)},null)}function y(e){return o["\u0275vid"](0,[(e()(),o["\u0275eld"](0,0,null,null,1,"uxd-blog",[],null,null,null,b,g)),o["\u0275did"](1,49152,null,0,a,[m.c],null,null)],null,null)}var w=o["\u0275ccf"]("uxd-blog",a,y,{},{},[]),v=n("dWZg"),x=n("lLAP"),k=n("gIcY"),T=n("Fzqc"),A=n("qAlS"),j=n("eDkP"),C=n("M2Lx"),S=n("qina"),q=n("zCE2"),I=n("4c35"),U=n("ZYCi"),$=n("FLOw"),M=n("XtaT");n.d(t,"BlogPageModuleNgFactory",function(){return F});var F=o["\u0275cmf"](i,[],function(e){return o["\u0275mod"]([o["\u0275mpd"](512,o.ComponentFactoryResolver,o["\u0275CodegenComponentFactoryResolver"],[[8,[s.a,l.mb,l.a,r.a,c.a,w]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o["\u0275mpd"](4608,u.NgLocalization,u.NgLocaleLocalization,[o.LOCALE_ID,[2,u["\u0275angular_packages_common_common_a"]]]),o["\u0275mpd"](4608,v.a,v.a,[]),o["\u0275mpd"](4608,x.i,x.i,[v.a]),o["\u0275mpd"](4608,x.h,x.h,[x.i,o.NgZone,u.DOCUMENT]),o["\u0275mpd"](136192,x.c,x.b,[[3,x.c],u.DOCUMENT]),o["\u0275mpd"](5120,x.l,x.k,[[3,x.l],[2,x.j],u.DOCUMENT]),o["\u0275mpd"](5120,x.g,x.e,[[3,x.g],o.NgZone,v.a]),o["\u0275mpd"](5120,d.H,d.r,[[3,d.H],[2,d.s]]),o["\u0275mpd"](4608,d.c,d.c,[[2,d.a]]),o["\u0275mpd"](4608,d.S,d.S,[]),o["\u0275mpd"](5120,d.fc,d.rb,[[3,d.fc]]),o["\u0275mpd"](4608,d.gc,d.gc,[x.g,d.c,d.fc,[2,d.a],o.RendererFactory2]),o["\u0275mpd"](4608,d.Fc,d.Fc,[o.RendererFactory2]),o["\u0275mpd"](4608,k.B,k.B,[]),o["\u0275mpd"](6144,T.b,null,[u.DOCUMENT]),o["\u0275mpd"](4608,T.c,T.c,[[2,T.b]]),o["\u0275mpd"](5120,A.c,A.a,[[3,A.c],o.NgZone,v.a]),o["\u0275mpd"](5120,A.f,A.e,[[3,A.f],v.a,o.NgZone]),o["\u0275mpd"](4608,j.f,j.f,[A.c,A.f,o.NgZone,u.DOCUMENT]),o["\u0275mpd"](5120,j.b,j.g,[[3,j.b],u.DOCUMENT]),o["\u0275mpd"](4608,j.e,j.e,[A.f,u.DOCUMENT]),o["\u0275mpd"](5120,j.c,j.j,[[3,j.c],u.DOCUMENT]),o["\u0275mpd"](4608,j.a,j.a,[j.f,j.b,o.ComponentFactoryResolver,j.e,j.c,o.ApplicationRef,o.Injector,o.NgZone,u.DOCUMENT]),o["\u0275mpd"](5120,j.h,j.i,[j.a]),o["\u0275mpd"](4608,C.b,C.b,[]),o["\u0275mpd"](4608,d.hf,d.hf,[]),o["\u0275mpd"](4608,d.vd,d.vd,[]),o["\u0275mpd"](1073742336,u.CommonModule,u.CommonModule,[]),o["\u0275mpd"](1073742336,d.qb,d.qb,[]),o["\u0275mpd"](1073742336,v.b,v.b,[]),o["\u0275mpd"](1073742336,x.a,x.a,[]),o["\u0275mpd"](1073742336,d.I,d.I,[]),o["\u0275mpd"](1073742336,d.b,d.b,[]),o["\u0275mpd"](1073742336,S.a,S.a,[]),o["\u0275mpd"](1073742336,q.a,q.a,[]),o["\u0275mpd"](1073742336,k.y,k.y,[]),o["\u0275mpd"](1073742336,k.l,k.l,[]),o["\u0275mpd"](1073742336,T.a,T.a,[]),o["\u0275mpd"](1073742336,I.c,I.c,[]),o["\u0275mpd"](1073742336,A.b,A.b,[]),o["\u0275mpd"](1073742336,j.d,j.d,[]),o["\u0275mpd"](1073742336,C.c,C.c,[]),o["\u0275mpd"](1073742336,d.B,d.B,[]),o["\u0275mpd"](1073742336,d.gf,d.gf,[]),o["\u0275mpd"](1073742336,d.yd,d.yd,[]),o["\u0275mpd"](1073742336,U.p,U.p,[[2,U.v],[2,U.m]]),o["\u0275mpd"](1073742336,d.Rd,d.Rd,[]),o["\u0275mpd"](1073742336,$.a,$.a,[]),o["\u0275mpd"](1073742336,d.ud,d.ud,[]),o["\u0275mpd"](1073742336,M.a,M.a,[]),o["\u0275mpd"](1073742336,i,i,[]),o["\u0275mpd"](1024,U.k,function(){return[[{path:"",component:a}]]},[])])})}}]);