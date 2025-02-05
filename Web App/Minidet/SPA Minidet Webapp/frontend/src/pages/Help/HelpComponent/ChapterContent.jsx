import diagram from "../images/chapter_1_diagram.png";
import login from "../images/chapter_2_login.png";
import showPassword from "../images/chapter_2_showPassword.png";
import cantLockIn from "../images/chapter_2_lockLoggedin.png";
import barChart from "../images/chapter_3_barChart.png";
import dataPage from "../images/chapter_4_dataPage.png";
import filter from "../images/chapter_4_filter.png";
import sort from "../images/chapter_4_sort.png";
import pagination from "../images/chapter_4_pagination.png";
import query from "../images/chapter_4_query.png";
import rowLimit from "../images/chapter_4_rowLimit.png";
import setting from "../images/chapter_5_settings.png";
import failed from "../images/chapter_5_failed.png";
import success from "../images/chapter_5_success.png";
import canNotRemove from "../images/chapter_5_canNotRemove.png";
import passwordPolicy from "../images/chapter_5_passwordPolicy.png";
import help from "../images/chapter_6_help.png";
import profile from "../images/chapter_7_editProfile.png";

export const chaptersContent = [
  {
    id: "chapter1",
    title: "Chapter 1: Introduction",
    content: `
      <p>
        As the volume of cybersecurity threats increases at an unprecedented rate, human operators are unable to react 
        rapidly enough to prevent potential breaches. Hence, automated, real-time anomaly detection systems have become 
        a necessity.
      </p>
      <p>
        The <strong>Cybersecurity Anomaly Detection System</strong> addresses these challenges by leveraging a 
        combination of real-time data monitoring, machine-learning models, and intuitive user interfaces. This real-time 
        web-based application is designed to:
      </p>
      <ul>
        <li>Monitor network traffic and detect anomalies in real time using rule-based and machine-learning models.</li>
        <li>Store, query, and analyze data using MongoDB.</li>
        <li>Apply AI models to label incoming data as <em>normal</em> or <em>abnormal</em>.</li>
        <li>Provide robust user management with an <strong>Admin</strong> account and individual user profiles.</li>
      </ul>
      <img style = "padding: 20px"
      src="${diagram}" alt="System Overview Diagram" width="100%">
      <p>
        The diagram above illustrates how the system is designed, all functionalities and logic as well as customer journey.
      </p>
    `,
  },
  {
    id: "chapter2",
    title: "Chapter 2: Logging In",
    content: `
      <p>
        To access the system, each user must provide valid credentials consisting of a unique <em>username</em> and 
        <em>password</em>. 
      </p>
      <img style = "padding: 20px" src="${login}" alt="Login Screen" width="100%">
      <p><strong>Login Steps:</strong></p>
      <ol>
        <li>Navigate to the login screen.</li>
        <li>Enter your registered username and password in the provided fields.</li>
        <li>Click the <em>Sign in</em> button.</li>
      </ol>
        <br>
      <p> There is an option to show and hide password. To show or hide password, follow the steps</p>
        <ol>
        <li>Navigate to the box on the left of <em>Show password</em>.</li>
        <li>Click the <em>Show password</em> button.</li>
      </ol>
      <img style = "padding: 20px" src="${showPassword}" alt="Login Screen" width="100%">
      <p>
        <strong>Error Handling:</strong> If your credentials are incorrect, the system will display an error message. 
        After a certain number of failed attempts (by default, 5), your account may be temporarily locked for security 
        reasons.
      </p>
            <img style = "padding: 20px" src="${cantLockIn}" alt="Login Screen" width="100%">
      <p>
        <strong>Password Reset:</strong> If you have forgotten your password, contact the administrator to reset it.
      </p>
      <br>
      <p>
        Once logged in successfully, your session will begin, and you will be forwarded to the <em>Homepage</em>.
      </p>
    `,
  },
  {
    id: "chapter3",
    title: "Chapter 3: Homepage Overview",
    content: `
      <p>
        After logging in, you are greeted by the <strong>Homepage</strong>. This section provides a real time bar chart which spikes when an anomaly is detected.
      </p>
            <img style = "padding: 20px" src="${barChart}" alt="Login Screen" width="100%">
      <p><strong>Features on the Homepage:</strong></p>
      <ul>
        <li>
          <strong>Live Clock:</strong> Displays current date and time, optionally adjusting based on the user’s 
          location or system settings.
        </li>
        <li>
          <strong>Pending Threads Counter:</strong> Shows the number of cybersecurity threats or anomalies that have 
          been flagged but not yet addressed.
        </li>
        <li>
          <strong>Interactive Graph:</strong> An automatically updating chart reflects the volume of new data arriving 
          every second, allowing quick detection of unusual spikes or dips.
        </li>
      </ul>
      <p>
        The sidebar on the left (or collapsible menu, depending on screen width) provides easy navigation to other 
        system pages: <em>Data</em>, <em>User Settings</em>, and <em>Help</em>. From the top-right icon, you can 
        access your profile settings or log out.
      </p>
    `,
  },
  {
    id: "chapter4",
    title: "Chapter 4: Data Page - Viewing Network Traffic",
    content: `
      <p>
        The <strong>Data Page</strong> is the core of the system’s analysis features, allowing you to inspect 
        real-time network traffic in a comprehensive table and accompanying graphs.
      </p>
         
      <p><strong>Data Table:</strong> Each row represents a unit of network traffic, including metadata (e.g., source IP, 
      destination IP, ports) and an <em>anomaly label</em> if any threat is detected. Use the columns to:</p>   
      <img style = "padding: 20px" src="${dataPage}" alt="Login Screen" width="100%">
      <ul>
        <li>
          <strong>Filter by Substring:</strong> Narrow down results selecting filter value in the a column’s filter box. Multiple 
          filters are allowed simultaneously.
        </li>
         <img style = "padding: 20px" src="${filter}" alt="Login Screen" width="100%">

        <li>
          <strong>Sort Columns (A-Z or Z-A):</strong> Click on a column header to sort. Press <em>Ctrl</em> or 
          <em>Shift</em> for multi-column sorting.
        </li>
        <br> There is a <em>Reset Button</em> to reset the sorting and filtering
        <img style = "padding: 20px" src="${sort}" alt="Login Screen" width="100%">

        <li>
          <strong>Advanced Query:</strong> Click the <em>Query Bar</em>  to input MongoDB or SQL-like 
          queries
          <br> MongoDB: <code>mongo.db.input.find({"attack_name": "Benign"}, {"_id": 0}) </code>
          <br> MongoDB: <code>mongo.db.input.find({"attack_name": "Benign", "protocol": 6}) </code>
          <br> SQL:  <code> Select source_ip from input where source_ip = 59.166.0.1</code>.
          <br> SQL: <code> Select source_ip, destination_ip from input where source_ip = 59.166.0.1</code>
        </li>
        <br> Once input MongoDB or SQL-like query, press on the search button and the results will populate the table 
         <img style = "padding: 20px" src="${query}" alt="Login Screen" width="100%">


        <li>
          <strong>Pagination:</strong> Making large datasets more 
          manageable by reducing the number of columns
        </li>
        <img style = "padding: 20px" src="${pagination}" alt="Login Screen" width="100%">
      </ul>

      <li>
          <strong>Row Limit:</strong> Set how many rows to display at once, the default is 10 rows
        </li>
        <img style = "padding: 20px" src="${rowLimit}" alt="Login Screen" width="100%">

      <p>
        <strong>Graph of Anomalies:</strong> On the top of the table, a graph shows the total number of anomalies detected. 
        <br> A pie chart displaying the percentage of the total traffic, populated with different type of cyber threats as well as no threats,. This helps identify patterns and trends in detected threats.
        <br> A Bar chart of incoming traffic is shown simultaneously as the data is ingested, an underlying AI model instantly classifies each data as <em>“Normal”</em> or one of 
        several <em>“Anomaly”</em> types, identified by codes (1–9) that map to specific attack types.
      </p>
      <p>
        Use this page 
        to quickly investigate unusual activity and respond to potential security incidents.
      </p>
    `,
  },
  {
    id: "chapter5",
    title: "Chapter 5: User Settings - Managing Users",
    content: `
      <p>
        The <strong>User Settings</strong> panel is where administrators can create, modify, or remove user accounts. 
        The system ensures each user has a distinct role and set of credentials for accountability.
      </p>
      <img style = "padding: 20px" src="${setting}" alt="Login Screen" width="100%">
      <br>
      <p><strong>Features:</strong></p>
      <ul>
        <li>
          <strong>Default Admin Account:</strong> A special account with full privileges that cannot be removed. 
          Typically used for high-level tasks such as user management and advanced configuration.
        </li>
        <li>
          <strong>Add/Remove Users:</strong> Provide <em>name</em>, <em>surname</em>, <em>username</em>, and 
          <em>password</em> to register a new user. Removal can be done via the “Delete” or “Remove” button next 
          to each entry.
        </li>

           <ul>
        <li>
          <strong>Add:</strong> Press the <em>CREATE NEW USER</em> button and fill out the form

          <br> If an user has already been created, you cannot re-create it again and there will be an alert which says <em>Failed </em>
          <img style = "padding: 20px" src="${failed}" alt="Login Screen" width="100%">

          <br> If an user information is unique, you will be able to create it and there will be an alert which says <em>Success </em>
          <img style = "padding: 20px" src="${success}" alt="Login Screen" width="100%">

        </li>
        <li>
          <strong>Remove:</strong> Press the <em>TRASH CAN</em> button to remove an user. The table will refresh for any changes made from the user
          <br> Important notice: Users with role "admin" can not be removed and there will be an alert that says <em>Cannot delete admin </em>
          <img style = "padding: 20px" src="${canNotRemove}" alt="Login Screen" width="100%">

        </li>
      </ul>

        <li>
          <strong>Password Policies:</strong> The application may enforce strong password rules to enhance security. 
          These can include minimum length of 8 characters, character requirements such as one lower case, one upper case letter, and more which will be noticed as the user type in the password
        </li>
         <img style = "padding: 20px" src="${passwordPolicy}" alt="Login Screen" width="100%">

      </ul>
    `,
  },
  {
    id: "chapter6",
    title: "Chapter 6: Help - Using the User Manual",
    content: `
      <p>
        The <strong>Help</strong> section provides an interactive user manual with collapsible chapters, a search 
        function, and quick navigation links.
      </p>
       <img style = "padding: 20px" src="${help}" alt="Login Screen" width="100%">

      <p><strong>Using the Help Page:</strong></p>
      <ul>
        <li>
          <strong>Collapsible Chapters:</strong> Each chapter can be expanded or collapsed, so you can quickly access 
          the information you need without excessive scrolling.
        </li>
        <li>
          <strong>Search Bar:</strong> Located at the top right of the page. Type keywords like “password,” “sorting,” or 
          “anomaly” to find relevant sections. You can even type sentences like "logging out". The pages which contain the related content will be highlighted on the table of content and you will be quickly transferred to the <strong>First highlighted page</strong> 
        </li>
        <li>
          <strong>Clickable Table of Contents:</strong> A dynamic menu at the beginning of the Help page lets you jump 
          to the desired chapter instantly.
        </li>
        <li>
          <strong>Embedded Screenshots:</strong> Each chapter includes relevant images that illustrate system features 
          and functionalities.
        </li>
      </ul>
      <p>
        If you cannot find a solution to your question in the Help section, refer to the <em>FAQ</em> (Chapter 8) or 
        contact the system administrator.
      </p>
    `,
  },
  {
    id: "chapter7",
    title: "Chapter 7: Logging Out and Editing Profile",
    content: `
      <p>
        In the top-right corner of every page, you’ll see an icon representing your profile. This menu provides quick 
        access to <em>profile editing</em> and <em>logout</em> options.
      </p>
      <img style = "padding: 20px" src="${profile}" alt="Login Screen" width="100%">
      <p><strong>Profile Editing:</strong> From here, you can change your <em>name</em>, <em>surname</em>, or 
      <em>password</em>. However, your <em>username</em> remains immutable for security and auditing reasons. You can also change the location which will affect the systems time. The default time-zone is in Hanoi </p>
      <p><strong>Logging Out:</strong> Always log out of your session when you are finished or plan to step away 
      from your computer. This prevents unauthorized access to your account.</p>
      <p>
        If you change your password, remember to log in again with the new credentials the next time you access 
        the system.
      </p>
    `,
  },
  {
    id: "chapter8",
    title: "Chapter 8: FAQ - Common Issues & Troubleshooting",
    content: `
      <p>
        Below are solutions to frequently encountered problems. If your issue is not listed here, consult the 
        <strong>Help</strong> section or contact the administrator.
      </p>
      <p><strong>Frequently Asked Questions:</strong></p>
      <ul>
        <li>
          <strong>Q: I forgot my password. What do I do?</strong><br/>
          A: Contact the admin to reset your password
        </li>
        <li>
          <strong>Q: Why is the real-time graph not updating?</strong><br/>
          A: Verify your internet connection and ensure the data generator is running. If the problem persists, 
          refresh the page to re-establish the connection.
        </li>
        <li>
          <strong>Q: How do I retrieve specific data from older records?</strong><br/>
          A: Use advanced filtering in the <em>Data Page</em> by inputting MongoDB or SQL-like queries. You can also 
          increase the pagination limit to view more rows.
        </li>
        <li>
          <strong>Q: My username needs to be changed. Is that possible?</strong><br/>
          A: For auditing and security reasons, usernames are permanent. Create a new account if a name change 
          is necessary. For specific cases, please contact the administrator for consultation
        </li>
        <li> <strong>Q: What happens if multiple users try logging in at once?</strong><br/>
          A: The system allows multiple active users, but each login session is independent.
        </li>
      </ul>
      <p>
        These tips should address most routine issues. For additional assistance, reach out to technical support 
        or consult the relevant chapters in this manual.
      </p>
    `,
  },
];

export default chaptersContent;
