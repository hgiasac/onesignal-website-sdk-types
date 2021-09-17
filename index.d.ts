// Type definitions for amazon-cognito-auth-js 1.3
// Project: https://github.com/OneSignal/OneSignal-Website-SDK
// Definitions by: Toan Nguyen <https://github.com/hgiasac>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 4.0

export interface PromiseOrCallback<T> {
  (callback: (value: T) => void): void;
  (): Promise<T>;
}

export type OneSignalNotificationPermission = "default" | "granted" | "denied";

export type OneSignalNotificationPayload<
  D extends Record<string, unknown> = Record<string, unknown>
> = {
  id: string;
  heading: string;
  content: string;
  data?: D;
  url?: string;
  icon?: string;
  action?: string;
};

export type OneSignalActionButton = {
  // Choose any unique identifier for your button.
  // The ID of the clicked button is passed to you so you can identify which button is clicked
  id?: string;
  // The text the button should display. Supports emojis.
  text: string;
  // A valid publicly reachable URL to an icon.
  // Keep this small because it's downloaded on each notification display.
  icon?: string;
  // The URL to open when this action button is clicked.
  url?: string;
};

// Pass in these optional parameters within promptOptions when initializing to localize the HTTP popup prompt to your custom text and language.
// All entries are limited in length. Foreign characters accepted.
// Each parameter is optional, and its default is used when it is not included.
// https://documentation.onesignal.com/docs/web-push-sdk#init-promptoptions-parameters
export type OneSignalInitPromptOptions = {
  // Text that says 'wants to show notifications' by default. Limited to 75 characters.
  actionMessage?: string;
  // Text that says 'This is an example notification'.
  // Displays on non-mobile devices. Only one line is allowed.
  exampleNotificationTitleDesktop?: string;
  // Text that says 'Notifications will appear on your desktop'.
  // Displays on non-mobile devices. Only one line is allowed.
  exampleNotificationMessageDesktop?: string;
  // Text that says 'This is an example notification'.
  // Displays on mobile devices with limited screen width. Only one line is allowed.
  exampleNotificationTitleMobile?: string;
  // Text that says 'Notifications will appear on your device'.
  // Displays on mobile devices with limited screen width. Only one line is allowed.
  exampleNotificationMessageMobile?: string;
  // Text that says '(you can unsubscribe anytime)'.
  exampleNotificationCaption?: string;
  // Text that says 'CONTINUE'.
  acceptButtonText?: string;
  // Text that says 'NO THANKS'.
  cancelButtonText?: string;
  // Set to false to hide the OneSignal logo.
  showCredit?: boolean;
};

// Pass in these optional parameters within welcomeNotification when initializing
// to customize or disable the welcome notification sent to new site visitors.
// Any person visiting your site for their first time, or an existing user
// who has completely cleared their cache is considered a new site visitor.
// https://documentation.onesignal.com/docs/web-push-sdk#init-welcomenotification-parameters
export type OneSignalInitWelcomeNotification = {
  // Disables sending a welcome notification to new site visitors.
  // If you want to disable welcome notifications, this is the only option you need.
  disable?: boolean;
  // The welcome notification's title. You can localize this to your own language.
  // If not set, or left blank, the site's title will be used.
  // Set to one space ' ' to clear the title, although this is not recommended.
  title?: string;
  // Required: The welcome notification's message. You can localize this to your own language.
  // A message is required. If left blank or set to blank, the default of 'Thanks for subscribing!' will be used.
  message: string;
  // An optional URL to open after the user clicks the welcome notification.
  // By default, clicking the welcome notification does not open any link.
  // This is recommended because the user has just visited your site and subscribed.
  url?: string;
};

export type OneSignalInitNotifyButton = {
  // Enable the Subscription Bell. The Subscription Bell is otherwise disabled by default.
  enable?: boolean;
  // A function you define that returns true to show the Subscription Bell, or false to hide it.
  // You can also return a Promise that resolves to true or false for awaiting asynchronous operations.
  // Typically used the hide the Subscription Bell after the user is subscribed.
  displayPredicate?: () => boolean | Promise<boolean>;
  // The Subscription Bell will initially appear at one of these sizes, and then shrink down to size 'small' after the user subscribes.
  size?: "small" | "medium" | "large";
  // The Subscription Bell will be fixed at this location on your page.
  position?: "bottom-left" | "bottom-right";
  // Specify CSS-valid pixel offsets using bottom, left, and right.
  offset?: {
    bottom?: string;
    left?: string;
    right?: string;
  };
  // If true, the Subscription Bell will display an icon that there is 1 unread message.
  // When hovering over the Subscription Bell, the user will see custom text set by message.prenotify.
  prenotify?: boolean;
  // Set false to hide the 'Powered by OneSignal' text in the Subscription Bell dialog popup.
  showCredit?: boolean;
  // Customize the Subscription Bell text.
  text?: Record<string, string>;
};

export type OneSignalInitWebhooks = {
  cors?: boolean;
  // This event occurs after a notification is displayed.
  "notification.displayed"?: string;
  // This event occurs after a notification is clicked.
  "notification.clicked"?: string;
  // This event occurs after a notification is intentionally dismissed by the user
  // (clicking the notification body or one of the notification action buttons does not trigger the dismissed webhook),
  // after a group of notifications are all dismissed (with this notification as part of that group),
  // or after a notification expires on its own time and disappears.
  // This event is supported on Chrome only.
  "notification.dismissed"?: string;
};

// https://documentation.onesignal.com/docs/web-push-sdk#init
export type OneSignalInitOptions = {
  // Required: Your OneSignal app id found on the settings page at onesignal.com.
  appId: string;
  // Required on HTTP ONLY: This must match the label you entered in Site Settings.
  subdomainName?: string;
  // Allows you to delay the initialization of the SDK until the user provides privacy consent.
  // The SDK will not be fully initialized until the provideUserConsent function is called.
  requiresUserPrivacyConsent?: boolean;
  // Localize the HTTP popup prompt.
  promptOptions?: OneSignalInitPromptOptions;
  // Customize or disable the welcome notification sent to new site visitors.
  welcomeNotification?: OneSignalInitWelcomeNotification;
  // Enable and customize the notifyButton.
  notifyButton?: OneSignalInitNotifyButton;
  // Chrome (non-mobile) - true: persists notification, false: disappears after some time.
  // See our Notification Persistence Section for more info.
  // Firefox and Safari - notifications automatically dismiss after some time and this parameter does not control that.
  persistNotification?: boolean;
  // Webhooks are HTTP POST calls to a URL you choose when a certain event occurs.
  // You provide the base URL which will be POSTed to,
  // and we will POST the notification data (title, message, icon, url, etc...)
  // along with all custom data you sent with the notification.
  // https://documentation.onesignal.com/docs/webhooks
  webhooks?: OneSignalInitWebhooks;
  // Recommended, HTTPS ONLY - Automatically resubscribes users when they clear browser cache or migrating to OneSignal.
  // This is set in the OneSignal dashboard during setup but if set again during initialization, will override dashboard config.
  autoResubscribe?: boolean;
  // Not Recommended: Shows Native Browser Prompt immediately. We do not recommend using because it creates a poor user experience.
  autoRegister?: boolean;
  // Default: If the launch URL of the notification matches exactly to a tab already open it will be focused.
  // "origin"- If the launch URL of the notification matches any tab already open to your domain it will be focused.
  // See addListenerForNotificationOpened documentation for more details.
  notificationClickHandlerMatch?: string;
  // navigate: Default: Automatically navigate to the launchURL on opening the notification.
  // focus: Only apply if notificationClickHandlerMatch is set to "origin". Only focuses an existing tab if the launch URL matches the domain instead of navigating. See addListenerForNotificationOpened documentation for more details.
  notificationClickHandlerAction?: "navigate" | "focus";
  // Special Case on HTTPS ONLY: Absolute path to OneSignal SDK web worker files.
  // You only need to set this parameter if you do not want the files at the root of your site.
  path?: string;
};

export interface OneSignalEvent {
  // Event occurs when the browser's native permission request has just been shown.
  (eventName: "permissionPromptDisplay", fn: () => void): void;
  // Event occurs when the user's subscription state changes between unsubscribed and subscribed.
  // https://documentation.onesignal.com/docs/web-push-sdk#subscriptionchange-event
  (eventName: "subscriptionChange", fn: (isSubscribed: boolean) => void): void;
  // Event occurs when the user clicks Allow or Block or dismisses the browser's native permission request.
  (
    eventName: "notificationPermissionChange",
    fn: (permission: { to: OneSignalNotificationPermission }) => void
  ): void;
  // Slide Prompt has just animated into view and is being shown to the user.
  (eventName: "popoverShown"): void;
  // The "Continue" button on the Slide Prompt was clicked.
  (eventName: "popoverAllowClick"): void;
  // The "No Thanks" button on the Slide Prompt was clicked.
  (eventName: "popoverCancelClick"): void;
  // The Slide Prompt was just closed.
  (eventName: "popoverClosed"): void;
  // Event occurs when the user clicks "No Thanks" or "Continue" on our HTTP Pop-Up Prompt (not the browser's permission request).
  (
    eventName: "customPromptClick",
    fn: (prompt: { result: OneSignalNotificationPermission }) => void
  ): void;
  // Event occurs after a notification is visibly displayed on the user's screen.
  // This event is fired on your page. If multiple browser tabs are open to your site,
  // this event will be fired on all pages on which OneSignal is active.
  // Note: The notificationDisplay event is only emitted on sites using HTTPS
  (
    eventName: "notificationDisplay",
    fn: (ev: OneSignalNotificationPayload) => void
  ): void;
  // This event occurs when:
  // - A user purposely dismisses the notification without clicking the notification body or action buttons
  // - On Chrome on Android, a user dismisses all web push notifications (this event will be fired for each web push notification we show)
  // - A notification expires on its own and disappears
  (
    eventName: "notificationDismiss",
    fn: (ev: OneSignalNotificationPayload) => void
  ): void;
  // Use this function to:
  // Listen for future clicked notifications
  // Check for notifications clicked in the last 5 minutes
  // Your callback will execute when the notification's body/title or action buttons are clicked.
  // Note: Not supported on Safari.
  // Note: This event occurs once only. If you would this to occur continuously every time a notification is clicked, please call this method again after your callback fires.
  (
    eventName: "addListenerForNotificationOpened",
    fn: (ev: OneSignalNotificationPayload) => void
  ): void;
}

export type OneSignal = {
  // OneSignal API functions can be called asynchronously using either:
  // 1. OneSignal.push(["functionName", param1, param2]);
  // 2. OneSignal.push(function() { OneSignal.functionName(param1, param2); });
  // Option 2 must be used for functions that return a value like isPushNotificationsSupported.
  // Option 2 also lets you call as many OneSignal functions as you need inside the passed-in function block.
  push: (args?: Array<string | unknown> | (() => void)) => void;
  // Call this from each page of your site to initialize OneSignal.
  init: (options: OneSignalInitOptions) => void;
  on: OneSignalEvent;
  once: OneSignalEvent;
  off: OneSignalEvent;
  // Pass in the full URL of the default page you want to open when a notification is clicked.
  // When creating a notification, any URL you specify will take precedence and override the default URL.
  // However if no URL is specified, this default URL specified by this call will open instead.
  // If no default URL is specified at all, the notification opens to the root of your site by default.
  // Safari - This function is not available. Instead, the default notification icon URL is the Site URL you set in your Safari settings.
  setDefaultNotificationUrl: (url: string) => void;
  // Sets the default title to display on notifications.
  // If a notification is created with a title, the specified title always overrides this default title.
  // A notification's title defaults to the title of the page the user last visited.
  // If your page titles vary between pages, this inconsistency can be undesirable.
  // Call this to standardize page titles across notifications, as long as a notification title isn't specified.
  setDefaultTitle: (title: string) => void;
  // If your website is set to require the user's privacy consent or some action before they can subscribe to push,
  // add requiresUserPrivacyConsent: true property in the OneSignal init call.
  // This will stop our SDK from initializing until you call provideUserConsent(true).
  // You can also revoke consent by setting provideUserConsent(false).
  // This will prevent further collection of user data.
  // To delete the user's current data see Delete User Data.
  provideUserConsent: (value: boolean) => void;
  // HTTP Setup: Opens a popup window to mylabel.os.tc/subscribe to prompt the user to subscribe to push notifications.
  // Call this in response to a user action like a button or link that was just clicked,
  // otherwise the browser's popup blocker will prevent the popup from opening.
  // HTTPS Setup: You may call this at any time to show the prompt for push notifications.
  // If notification permissions have already been granted, nothing will happen.
  showNativePrompt: () => void;
  registerForPushNotifications: () => void;
  // Shows the OneSignal Slide Prompt for HTTP and HTTPS sites.
  // This slides down from the top (or up from the bottom on mobile). Please see Slide Prompt for more details.
  // Note: This does not replace the Native Browser Prompt required for subscription.
  showSlidedownPrompt: () => void;
  // Shows the OneSignal Category Slidedown for HTTP and HTTPS sites.
  // This slides down from the top (or up from the bottom on mobile).
  // Please see Category Slidedown for more details.
  // Note: This does not replace the Native Browser Prompt required for subscription.
  showCategorySlidedown: () => void;
  // Returns a Promise that resolves to the browser's current notification permission as 'default', 'granted', or 'denied'.
  // You can use this to detect whether the user has allowed notifications, blocked notifications, or has not chosen either setting.
  getNotificationPermission: PromiseOrCallback<OneSignalNotificationPermission>;
  //Returns true if the current browser environment viewing the page supports push notifications.
  // Almost all of the API calls on this page internally call this method first before continuing;
  // this check is therefore optional but you may call it if you wish to display a custom message to the user.
  isPushNotificationsSupported: () => boolean;
  // HTTPS Only Returns a Promise that resolves to true if the user has already accepted push notifications and successfully registered with Google's FCM server and OneSignal's server (i.e. the user is able to receive notifications).
  // If you used OneSignal.setSubscription() or unsubscribed using the Bell Prompt or Custom Link prompt after the user successfully subscribes through the browser,
  // isPushNotificationsEnabled will show whatever value you set for setSubscription.
  // If you're deleting your user entry on our online dashboard for testing,
  // the SDK will not sync with our dashboard and so this method will still return true (because you are still subscribed to the site's notifications).
  // Follow Clearing your cache and resetting push permissions to reset the browser data.
  isPushNotificationsEnabled: PromiseOrCallback<boolean>;
  // Returns a Promise that resolves to the stored OneSignal Player ID of the Push Record if one is set,
  // otherwise the Promise resolves to null. If the user isn't already subscribed, this function will resolve to null immediately.
  getUserId: PromiseOrCallback<string>;
  // Sends a push notification to the current user on the webpage.
  // This is a simplified utility function to send a test message to yourself or a quick message to the user.
  // It does not support any targeting options.
  sendSelfNotification: (
    title: string,
    message: string,
    url?: string,
    icon?: string,
    data?: Record<string, unknown>,
    buttons?: OneSignalActionButton[]
  ) => void;
  // This function is for sites that wish to have more granular control of which users receive notifications,
  // such as when implementing notification preference pages.
  // This function lets a site mute or unmute notifications for the current user.
  // This event is not related to actually prompting the user to subscribe.
  // The user must already be subscribed for this function to have any effect.
  setSubscription: (unmute: boolean) => void;

  // Allows you to set the user's email address with the OneSignal SDK.
  // We offer several overloaded versions of this method.
  // It is best to call this when the user provides their email.
  // If setEmail called previously and the user changes their email,
  // you need to call logoutEmail and then setEmail with new address to update it.
  setEmail: (email: string) => Promise<string>;
  // If your app or website implements logout functionality, you can call logoutEmail to dissociate the email from the device:
  logoutEmail: () => void;
  // Returns a Promise that resolves to the stored OneSignal Player ID of the Email Record if one is set using the setEmail method.
  // Otherwise the Promise resolves to null. If the user isn't already subscribed, this function will resolve to null immediately.
  getEmailId: PromiseOrCallback<string>;
  // The setSMSNumber method allows you to set the user's SMS number with the OneSignal SDK.
  setSMSNumber: (sms: string) => void;
  // If your app or website implements logout functionality, you can call logoutSMSNumber to dissociate the SMS from the device:
  logoutSMSNumber: () => void;
  // Get the OneSignal Player ID associated with the SMS Phone Number Record.
  getSMSId: PromiseOrCallback<string>;
  sendTag: {
    (
      key: string,
      value: string,
      callback: (tagsSent: Record<string, string>) => void
    ): void;
    (key: string, value: string): Promise<Record<string, string>>;
  };
  sendTags: {
    (
      tags: Record<string, string>,
      callback: (tagsSent: Record<string, string>) => void
    ): void;
    (tags: Record<string, string>): Promise<Record<string, string>>;
  };
  getTags: {
    (callback: (tagsSent: Record<string, string>) => void): void;
    (): Promise<Record<string, string>>;
  };
  deleteTag: (key: string) => void;
  deleteTags: {
    (keys: string[], callback: (tagsDeleted: string[]) => void): void;
    (keys: string[]): Promise<string[]>;
  };
  // set a string data type property you can set to associate your own User Ids to each of their corresponding OneSignal device records.
  setExternalUserId: (externalUserId: string) => void;
  // remove external user id. It is recommended to call this method when the user logs out of your app.
  removeExternalUserId: () => void;
  // Gets the external user id value stored locally on the user's browser.
  getExternalUserId: () => Promise<string>;
};
