import { useState, useEffect } from 'react';
import { 
  FiStar, FiChevronDown, FiChevronUp, FiExternalLink, 
  FiSearch, FiX, FiDollarSign, FiTrendingUp, FiBookOpen,
  FiUser, FiSave, FiBookmark, FiAward, FiBarChart2, FiMap,
  FiCheck, FiClock, FiHome, FiGlobe
} from 'react-icons/fi';
import './App.css';

function App() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevels, setSkillLevels] = useState({});
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [user, setUser] = useState(null);
  const [assessments, setAssessments] = useState({});
  const [location, setLocation] = useState('Global');
  const [darkMode, setDarkMode] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
      const newLevels = { ...skillLevels };
      delete newLevels[skill];
      setSkillLevels(newLevels);
    } else if (selectedSkills.length < 10) { 
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const setSkillLevel = (skill, level) => {
    setSkillLevels({ ...skillLevels, [skill]: level });
  };

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue', 
    'Node.js', 'Express', 'Python', 'Django', 'Flask',
    'SQL', 'MongoDB', 'PostgreSQL', 'Git', 'Docker',
    'AWS', 'Azure', 'GraphQL', 'REST API', 'TypeScript',
    'Redux', 'Jest', 'Cypress', 'Webpack', 'Babel'
  ];

  const jobData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      type: "frontend",
      skillsRequired: ["HTML", "CSS", "JavaScript", "React"],
      description: "Build interactive user interfaces for web applications.",
      salary: "$75,000 - $120,000",
      experience: "2+ years",
      location: "North America",
      responsibilities: [
        "Develop responsive UIs with React",
        "Optimize frontend performance",
        "Collaborate with UX designers",
        "Write clean, maintainable code"
      ],
      resources: [
        { name: "React Documentation", url: "https://reactjs.org/docs" },
        { name: "Frontend Roadmap", url: "https://roadmap.sh/frontend" },
        { name: "CSS Tricks", url: "https://css-tricks.com" }
      ],
      demand: "High",
      remote: true
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "DevSolutions",
      type: "backend",
      skillsRequired: ["Node.js", "Express", "SQL", "REST API"],
      description: "Develop server-side logic and database architecture.",
      salary: "$80,000 - $130,000",
      experience: "3+ years",
      location: "Europe",
      responsibilities: [
        "Design and implement APIs",
        "Optimize database queries",
        "Implement authentication systems",
        "Ensure system security"
      ],
      resources: [
        { name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
        { name: "SQL Tutorial", url: "https://www.w3schools.com/sql" }
      ],
      demand: "High",
      remote: true
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "DigitalInnovations",
      type: "fullstack",
      skillsRequired: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      description: "Handle both client-side and server-side development.",
      salary: "$90,000 - $140,000",
      experience: "4+ years",
      location: "Global",
      responsibilities: [
        "Develop end-to-end features",
        "Architect scalable applications",
        "Mentor junior developers",
        "Participate in code reviews"
      ],
      resources: [
        { name: "Full Stack Open", url: "https://fullstackopen.com" },
        { name: "MERN Stack Guide", url: "https://www.mongodb.com/mern-stack" }
      ],
      demand: "Very High",
      remote: true
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudMasters",
      type: "devops",
      skillsRequired: ["Docker", "AWS", "Git", "CI/CD"],
      description: "Implement and maintain deployment infrastructure.",
      salary: "$100,000 - $150,000",
      experience: "3+ years",
      location: "North America",
      responsibilities: [
        "Automate deployment pipelines",
        "Monitor system performance",
        "Implement security best practices",
        "Optimize cloud costs"
      ],
      resources: [
        { name: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        { name: "AWS Documentation", url: "https://docs.aws.amazon.com" }
      ],
      demand: "High",
      remote: true
    },
    {
      id: 5,
      title: "Python Developer",
      company: "DataSystems",
      type: "backend",
      skillsRequired: ["Python", "Django", "SQL"],
      description: "Develop server-side applications and data processing.",
      salary: "$85,000 - $125,000",
      experience: "2+ years",
      location: "Asia",
      responsibilities: [
        "Develop RESTful APIs",
        "Optimize database performance",
        "Implement data processing pipelines",
        "Write unit tests"
      ],
      resources: [
        { name: "Python Documentation", url: "https://docs.python.org" },
        { name: "Django Docs", url: "https://docs.djangoproject.com" }
      ],
      demand: "Medium",
      remote: false
    }
  ];

  const careerPaths = {
    frontend: {
      title: "Frontend Developer Path",
      description: "Progress from Junior to Senior Frontend roles",
      milestones: [
        "Master HTML/CSS/JS fundamentals",
        "Learn React/Vue/Angular",
        "Build portfolio projects",
        "Learn testing (Jest, Cypress)",
        "Master performance optimization",
        "Learn TypeScript",
        "Contribute to open source"
      ],
      averageSalary: "$110,000",
      timeline: "2-5 years"
    },
    fullstack: {
      title: "Full Stack Developer Path",
      description: "Become proficient in both frontend and backend",
      milestones: [
        "Master frontend fundamentals",
        "Learn Node.js/Express",
        "Understand databases (SQL/NoSQL)",
        "Build fullstack applications",
        "Learn authentication systems",
        "Master deployment (Docker, AWS)",
        "Learn GraphQL"
      ],
      averageSalary: "$125,000",
      timeline: "3-6 years"
    },
    devops: {
      title: "DevOps Engineer Path",
      description: "From sysadmin to cloud architect",
      milestones: [
        "Learn Linux fundamentals",
        "Master Git and CI/CD",
        "Learn containerization (Docker)",
        "Study cloud platforms (AWS/Azure)",
        "Implement monitoring solutions",
        "Master infrastructure as code",
        "Learn security best practices"
      ],
      averageSalary: "$130,000",
      timeline: "3-7 years"
    }
  };

  const companyData = {
    TechCorp: {
      rating: 4.2,
      techStack: ["React", "Node.js", "AWS", "TypeScript"],
      interviewProcess: [
        "HR screening (30min)",
        "Technical test (2h)",
        "System design interview (1h)",
        "Culture fit interview (45min)"
      ],
      benefits: [
        "Unlimited PTO",
        "Remote work options",
        "$5k annual learning budget",
        "Stock options"
      ],
      hiringFocus: ["Frontend", "Full Stack"],
      glassdoor: "https://glassdoor.com/techcorp"
    },
    DevSolutions: {
      rating: 3.8,
      techStack: ["Angular", "Java", "Azure", "SQL"],
      interviewProcess: [
        "Online code challenge (4h)",
        "Pair programming session (2h)",
        "Technical deep dive (1.5h)"
      ],
      benefits: [
        "Flexible hours",
        "Comprehensive health insurance",
        "$3k conference budget",
        "Quarterly bonuses"
      ],
      hiringFocus: ["Backend", "DevOps"],
      glassdoor: "https://glassdoor.com/devsolutions"
    },
    DigitalInnovations: {
      rating: 4.5,
      techStack: ["Vue", "Python", "MongoDB", "GraphQL"],
      interviewProcess: [
        "Initial chat with team lead (45min)",
        "Take-home project (1 week)",
        "Project walkthrough (1h)",
        "Team lunch meeting"
      ],
      benefits: [
        "Fully remote",
        "4-day work weeks",
        "Profit sharing",
        "Paid sabbaticals"
      ],
      hiringFocus: ["Full Stack", "Mobile"],
      glassdoor: "https://glassdoor.com/digitalinnovations"
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('careerCompassData');
    if (savedData) {
      const { skills, levels, savedJobs, savedCompanies, userPrefs } = JSON.parse(savedData);
      setSelectedSkills(skills || []);
      setSkillLevels(levels || {});
      setSavedJobs(savedJobs || []);
      setSavedCompanies(savedCompanies || []);
      if (userPrefs) {
        setDarkMode(userPrefs.darkMode || false);
        setLocation(userPrefs.location || 'Global');
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      skills: selectedSkills,
      levels: skillLevels,
      savedJobs,
      savedCompanies,
      userPrefs: { darkMode, location }
    };
    localStorage.setItem('careerCompassData', JSON.stringify(data));
  }, [selectedSkills, skillLevels, savedJobs, savedCompanies, darkMode, location]);

  const handleLogin = () => {
    setUser({
      id: 'user123',
      name: 'Developer',
      email: 'user@example.com',
      completedAssessments: []
    });
  };

  const takeAssessment = (skill) => {
    const score = Math.floor(Math.random() * 100);
    const newAssessments = {
      ...assessments,
      [skill]: score
    };
    setAssessments(newAssessments);
    
    const level = Math.min(5, Math.max(1, Math.ceil(score / 20)));
    setSkillLevels({
      ...skillLevels,
      [skill]: level
    });

    setShowAssessmentModal(true);
  };

  const toggleSavedJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const toggleSavedCompany = (companyName) => {
    if (savedCompanies.includes(companyName)) {
      setSavedCompanies(savedCompanies.filter(name => name !== companyName));
    } else {
      setSavedCompanies([...savedCompanies, companyName]);
    }
  };

  const calculateMatches = () => {
    const perfectMatches = [];
    const strongMatches = [];
    const partialMatches = [];

    jobData.forEach(job => {
    
      if (job.location && job.location !== 'Remote' && location !== 'Global' && job.location !== location) {
        return;
      }
      
      const matchedSkills = job.skillsRequired.filter(skill => 
        selectedSkills.includes(skill)
      );
      const matchPercentage = Math.round(
        (matchedSkills.length / job.skillsRequired.length) * 100
      );
      
      const jobWithMatchData = {
        ...job,
        matchPercentage,
        matchedSkills,
        missingSkills: job.skillsRequired.filter(skill => 
          !selectedSkills.includes(skill)),
        isSaved: savedJobs.includes(job.id)
      };

      if (matchPercentage === 100) {
        perfectMatches.push(jobWithMatchData);
      } else if (matchPercentage >= 70) {
        strongMatches.push(jobWithMatchData);
      } else if (matchPercentage >= 30) {
        partialMatches.push(jobWithMatchData);
      }
    });

    return { perfectMatches, strongMatches, partialMatches };
  };

  const { perfectMatches, strongMatches, partialMatches } = calculateMatches();

  // Helper functions
  const calculateDemandScore = () => {
    const totalJobs = jobData.length;
    const matchingJobs = jobData.filter(job => 
      job.skillsRequired.some(reqSkill => selectedSkills.includes(reqSkill))
    ).length;
    return Math.round((matchingJobs / totalJobs) * 100);
  };

  const calculateSalaryRange = () => {
    if (selectedSkills.length === 0) return { min: 0, max: 0 };
    
    let min = Infinity, max = 0;
    jobData.forEach(job => {
      if (job.skillsRequired.some(skill => selectedSkills.includes(skill))) {
        const salaryNumbers = job.salary.replace(/[^\d-]/g, '').split('-').map(Number);
        min = Math.min(min, salaryNumbers[0]);
        max = Math.max(max, salaryNumbers[1] || salaryNumbers[0]);
      }
    });
    
    return { 
      min: min === Infinity ? 0 : min.toLocaleString(), 
      max: max.toLocaleString() 
    };
  };

  const getRecommendedSkills = () => {
    const recommendations = new Set();
    jobData.forEach(job => {
      if (job.skillsRequired.some(skill => selectedSkills.includes(skill))) {
        job.skillsRequired.forEach(skill => {
          if (!selectedSkills.includes(skill)) recommendations.add(skill);
        });
      }
    });
    return Array.from(recommendations).slice(0, 5); // Return top 5 recommendations
  };

  const getCareerPaths = () => {
    const paths = [];
    if (selectedSkills.some(skill => ['HTML', 'CSS', 'JavaScript', 'React'].includes(skill))) {
      paths.push(careerPaths.frontend);
    }
    if (selectedSkills.some(skill => ['Node.js', 'Express', 'MongoDB', 'SQL'].includes(skill))) {
      paths.push(careerPaths.fullstack);
    }
    if (selectedSkills.some(skill => ['Docker', 'AWS', 'CI/CD'].includes(skill))) {
      paths.push(careerPaths.devops);
    }
    return paths.length > 0 ? paths : [{
      title: "General Tech Career Path",
      description: "Start with fundamental skills and specialize later",
      milestones: [
        "Learn programming fundamentals",
        "Choose a specialization (frontend/backend/data)",
        "Build projects to practice",
        "Learn version control (Git)",
        "Contribute to open source",
        "Prepare for technical interviews"
      ],
      averageSalary: "$85,000",
      timeline: "1-3 years"
    }];
  };

  const getTopCompanies = () => {
    const companies = [];
    
    // Add companies from job matches
    jobData.forEach(job => {
      if (!companies.includes(job.company)) {
        companies.push(job.company);
      }
    });
    
    // Add saved companies
    savedCompanies.forEach(company => {
      if (!companies.includes(company)) {
        companies.push(company);
      }
    });
    
    return companies.slice(0, 6); // Return top 6 companies
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-top">
          <h1>CareerCompass <span>Pro</span></h1>
          <div className="header-actions">
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="location-selector"
            >
              <option value="Global"><FiGlobe /> Global</option>
              <option value="North America">🇺🇸 North America</option>
              <option value="Europe">🇪🇺 Europe</option>
              <option value="Asia">🇮🇳 Asia</option>
            </select>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            {!user ? (
              <button onClick={handleLogin} className="login-button">
                <FiUser /> Sign In
              </button>
            ) : (
              <div className="user-badge">
                <FiUser /> {user.name}
              </div>
            )}
          </div>
        </div>
        <p>Your complete tech career navigation system</p>
      </header>

      <div className="main-container">
        <div className="skill-selector-container">
          <div className="skill-selector">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="clear-search">
                  <FiX />
                </button>
              )}
            </div>

            <div className="selected-skills">
              {selectedSkills.map(skill => (
                <span key={skill} className="selected-skill">
                  {skill}
                  {skillLevels[skill] && (
                    <span className="skill-level-indicator">
                      {Array(skillLevels[skill]).fill('★').join('')}
                    </span>
                  )}
                  <button 
                    onClick={() => handleSkillSelect(skill)}
                    className="remove-skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="skills-grid">
              {skills
                .filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(skill => (
                  <div
                    key={skill}
                    className={`skill-card ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => handleSkillSelect(skill)}
                  >
                    <div className="skill-name">
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        readOnly
                      />
                      {skill}
                    </div>
                    {selectedSkills.includes(skill) && (
                      <div className="skill-level">
                        {[1, 2, 3, 4, 5].map(level => (
                          <FiStar
                            key={level}
                            className={`star ${skillLevels[skill] >= level ? 'filled' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSkillLevel(skill, level);
                            }}
                          />
                        ))}
                        {user && (
                          <button 
                            className="assess-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              takeAssessment(skill);
                            }}
                          >
                            Test
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {selectedSkills.length > 0 && (
            <div className="skills-insights">
              <h3>Your Skills Analysis</h3>
              <div className="insight">
                <FiTrendingUp className="insight-icon" />
                <div>
                  <strong>{calculateDemandScore()}%</strong>
                  <span>of tech jobs match your skills</span>
                </div>
              </div>
              <div className="insight">
                <FiDollarSign className="insight-icon" />
                <div>
                  <strong>${calculateSalaryRange().min} - ${calculateSalaryRange().max}</strong>
                  <span>potential salary range</span>
                </div>
              </div>
              <div className="insight">
                <FiBookOpen className="insight-icon" />
                <div>
                  <strong>{getRecommendedSkills().length}</strong>
                  <span>recommended skills to learn next</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedSkills.length > 0 && (
          <div className="content-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                Job Matches
              </button>
              <button
                className={`tab ${activeTab === 'paths' ? 'active' : ''}`}
                onClick={() => setActiveTab('paths')}
              >
                Career Paths
              </button>
              <button
                className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skill Development
              </button>
              <button
                className={`tab ${activeTab === 'companies' ? 'active' : ''}`}
                onClick={() => setActiveTab('companies')}
              >
                Company Research
              </button>
            </div>

            {activeTab === 'jobs' && (
              <div className="results-container">
                {perfectMatches.length > 0 && (
                  <div className="matches-section">
                    <h2>
                      <FiStar className="star-icon" />
                      Perfect Matches ({perfectMatches.length})
                    </h2>
                    {perfectMatches.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        expanded={expandedJob === job.id}
                        onExpand={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        selectedSkills={selectedSkills}
                        skillLevels={skillLevels}
                        onSave={toggleSavedJob}
                      />
                    ))}
                  </div>
                )}

                {strongMatches.length > 0 && (
                  <div className="matches-section">
                    <h2>Strong Matches ({strongMatches.length})</h2>
                    {strongMatches.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        expanded={expandedJob === job.id}
                        onExpand={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        selectedSkills={selectedSkills}
                        skillLevels={skillLevels}
                        isPartial
                        matchPercentage={job.matchPercentage}
                        missingSkills={job.missingSkills}
                        isSaved={job.isSaved}
                        onSave={toggleSavedJob}
                      />
                    ))}
                  </div>
                )}

                {partialMatches.length > 0 && (
                  <div className="matches-section">
                    <h2>Potential Matches ({partialMatches.length})</h2>
                    {partialMatches.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        expanded={expandedJob === job.id}
                        onExpand={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        selectedSkills={selectedSkills}
                        skillLevels={skillLevels}
                        isPartial
                        matchPercentage={job.matchPercentage}
                        missingSkills={job.missingSkills}
                        isSaved={job.isSaved}
                        onSave={toggleSavedJob}
                      />
                    ))}
                  </div>
                )}

                {perfectMatches.length === 0 && strongMatches.length === 0 && partialMatches.length === 0 && (
                  <div className="no-matches">
                    <h3>No direct matches found</h3>
                    <p>Try adding more skills or adjusting your location filter</p>
                    <div className="recommended-skills">
                      <h4>Recommended skills to add:</h4>
                      <ul>
                        {getRecommendedSkills().map(skill => (
                          <li key={skill}>
                            <button onClick={() => handleSkillSelect(skill)}>
                              + {skill}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'paths' && (
              <div className="career-paths-container">
                <h2>Recommended Career Paths</h2>
                {getCareerPaths().map((path, index) => (
                  <div key={index} className="career-path">
                    <h3>{path.title}</h3>
                    <p>{path.description}</p>
                    <div className="path-meta">
                      <span><FiDollarSign /> {path.averageSalary}</span>
                      <span><FiClock /> {path.timeline}</span>
                    </div>
                    <div className="milestones">
                      <h4>Milestones:</h4>
                      <ol>
                        {path.milestones.map((milestone, i) => (
                          <li key={i}>
                            {milestone}
                            {i < path.milestones.length - 1 && <FiChevronDown className="milestone-arrow" />}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="path-resources">
                      <h4>Resources:</h4>
                      <div className="resources">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          Learning roadmap <FiExternalLink />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          Recommended courses <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="skill-development-container">
                <h2>Skill Development Plan</h2>
                <div className="current-skills">
                  <h3>Your Current Skills</h3>
                  <div className="skills-list">
                    {selectedSkills.map(skill => (
                      <div key={skill} className="skill-item">
                        <span>{skill}</span>
                        <div className="skill-level">
                          {Array(5).fill(0).map((_, i) => (
                            <FiStar
                              key={i}
                              className={`star ${skillLevels[skill] > i ? 'filled' : ''}`}
                            />
                          ))}
                          {assessments[skill] && (
                            <span className="assessment-score">
                              {assessments[skill]}%
                            </span>
                          )}
                        </div>
                        {user && (
                          <button 
                            className="assess-button"
                            onClick={() => takeAssessment(skill)}
                          >
                            {assessments[skill] ? 'Retest' : 'Assess'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="recommended-skills">
                  <h3>Recommended Skills to Learn</h3>
                  <ul>
                    {getRecommendedSkills().map(skill => (
                      <li key={skill}>
                        <span>{skill}</span>
                        <div className="skill-actions">
                          <a 
                            href={`https://www.google.com/search?q=learn+${skill}+programming`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resources <FiExternalLink />
                          </a>
                          <button 
                            className="add-skill"
                            onClick={() => handleSkillSelect(skill)}
                          >
                            + Add
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="companies-container">
                <h2>Top Companies Hiring for Your Skills</h2>
                <div className="company-cards">
                  {getTopCompanies().map(company => (
                    <div key={company} className="company-card">
                      <div className="company-header">
                        <h3>{company}</h3>
                        <div className="company-rating">
                          Rating: {companyData[company]?.rating || 4.0}/5
                        </div>
                        <button 
                          className={`save-company ${
                            savedCompanies.includes(company) ? 'saved' : ''
                          }`}
                          onClick={() => toggleSavedCompany(company)}
                        >
                          <FiBookmark />
                        </button>
                      </div>
                      <div className="company-details">
                        <h4>Tech Stack:</h4>
                        <div className="tech-stack">
                          {(companyData[company]?.techStack || ['JavaScript', 'React', 'Node.js']).map(tech => (
                            <span key={tech} className={`tech-tag ${
                              selectedSkills.includes(tech) ? 'matched' : ''
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h4>Interview Process:</h4>
                        <ol>
                          {(companyData[company]?.interviewProcess || [
                            "Technical screening",
                            "Coding challenge",
                            "System design",
                            "Culture fit"
                          ]).map((step, i) => (
                            <li key={i}>
                              <FiCheck className="process-check" /> {step}
                            </li>
                          ))}
                        </ol>
                        <h4>Benefits:</h4>
                        <ul>
                          {(companyData[company]?.benefits || [
                            "Health insurance",
                            "Remote options",
                            "Learning budget"
                          ]).map((benefit, i) => (
                            <li key={i}>
                              <FiStar className="benefit-star" /> {benefit}
                            </li>
                          ))}
                        </ul>
                        <a 
                          href={companyData[company]?.glassdoor || 'https://glassdoor.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reviews-link"
                        >
                          <FiBarChart2 /> View employee reviews
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="assessment-modal">
          <div className="modal-content">
            <h3>Your Assessment Results</h3>
            <div className="assessment-results">
              {Object.entries(assessments).map(([skill, score]) => (
                <div key={skill} className="assessment-item">
                  <span className="skill-name">{skill}</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${score}%` }}
                    ></div>
                    <span className="score-text">{score}%</span>
                  </div>
                  <div className="assessment-meta">
                    <span className="skill-level">
                      Level: {Math.min(5, Math.max(1, Math.ceil(score / 20)))}
                    </span>
                    <span className="skill-status">
                      {score >= 80 ? 'Expert' :
                       score >= 60 ? 'Proficient' :
                       score >= 40 ? 'Intermediate' :
                       score >= 20 ? 'Beginner' : 'Novice'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button 
                onClick={() => setShowAssessmentModal(false)}
                className="close-assessment"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowAssessmentModal(false);
                  setActiveTab('skills');
                }}
                className="view-skills"
              >
                View Skills Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Job Card Component
function JobCard({
  job,
  expanded,
  onExpand,
  selectedSkills,
  skillLevels,
  isPartial,
  matchPercentage,
  missingSkills,
  isSaved,
  onSave
}) {
  return (
    <div className={`job-card ${expanded ? 'expanded' : ''}`}>
      <div className="job-header" onClick={onExpand}>
        <div>
          <div className="job-title-row">
            <h3>{job.title}</h3>
            <span className="company-name">{job.company}</span>
          </div>
          <p>{job.description}</p>
          <div className="job-meta">
            <span className="salary"><FiDollarSign /> {job.salary}</span>
            <span className="experience"><FiUser /> {job.experience}</span>
            {job.remote && <span className="remote"><FiHome /> Remote</span>}
            {isPartial && (
              <span className="match-percentage">
                {matchPercentage}% Match
              </span>
            )}
            <span className={`demand ${job.demand.toLowerCase().replace(' ', '-')}`}>
              {job.demand} Demand
            </span>
          </div>
          <div className="skill-tags">
            {job.skillsRequired.map(skill => (
              <span
                key={skill}
                className={`skill-tag ${
                  selectedSkills.includes(skill) ? 'matched' : 'required'
                }`}
              >
                {skill}
                {selectedSkills.includes(skill) && skillLevels[skill] && (
                  <span className="skill-level">
                    {' '}(Level {skillLevels[skill]})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="job-header-right">
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave(job.id);
            }}
            className={`save-job ${isSaved ? 'saved' : ''}`}
          >
            <FiBookmark />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="job-details">
          <div className="details-section">
            <h4>Responsibilities:</h4>
            <ul>
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {isPartial && missingSkills.length > 0 && (
            <div className="details-section">
              <h4>Missing Skills:</h4>
              <div className="missing-skills">
                {missingSkills.map(skill => (
                  <span key={skill} className="missing-skill">
                    {skill}
                    <a 
                      href={`https://www.google.com/search?q=learn+${skill}+programming`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="learn-link"
                    >
                      Learn <FiExternalLink />
                    </a>
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.resources && job.resources.length > 0 && (
            <div className="details-section">
              <h4>Learning Resources:</h4>
              <div className="resources">
                {job.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {resource.name} <FiExternalLink />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="job-actions">
            <button className="apply-button">
              View Job Posting
            </button>
            <button className="save-button" onClick={() => onSave(job.id)}>
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
