import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, 
  Users, 
  Clock,
  CheckCircle,
  Plus,
  Star
} from 'lucide-react';

const StudentCourseList = () => {
  const { user } = useAuth();
  const { 
    getCoursesForUser, 
    getEnrolledCourses, 
    enrollInCourse, 
    isEnrolledInCourse,
    updateProgress,
    enrollments,
    reloadData 
  } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize some default courses if none exist
    initializeDefaultCourses();
    // Simulate loading delay
    setTimeout(() => setLoading(false), 300);
  }, []);

  const initializeDefaultCourses = () => {
    const allCourses = getCoursesForUser();
    console.log('Current available courses:', allCourses);
    
    // If no courses exist, create some default ones
    if (allCourses.length === 0) {
      console.log('No courses found, creating default courses...');
      
      // Simulate teacher creating courses by directly adding to localStorage
      const defaultCourses = [
        {
          _id: `course_${Date.now()}_1`,
          title: 'Introduction to Web Development',
          description: 'Learn HTML, CSS, JavaScript and React from scratch',
          category: 'programming',
          level: 'beginner',
          duration: '8 weeks',
          maxStudents: 30,
          teacherId: 'teacher_demo_1',
          teacherName: 'Prof. John Smith',
          createdAt: new Date().toISOString(),
          enrolledStudents: [],
          published: true
        },
        {
          _id: `course_${Date.now()}_2`,
          title: 'Advanced JavaScript',
          description: 'Master ES6+, async programming, and modern JavaScript patterns',
          category: 'programming',
          level: 'advanced',
          duration: '6 weeks',
          maxStudents: 25,
          teacherId: 'teacher_demo_2',
          teacherName: 'Dr. Sarah Johnson',
          createdAt: new Date().toISOString(),
          enrolledStudents: [],
          published: true
        },
        {
          _id: `course_${Date.now()}_3`,
          title: 'React Development',
          description: 'Build modern web applications with React and Redux',
          category: 'programming',
          level: 'intermediate',
          duration: '10 weeks',
          maxStudents: 20,
          teacherId: 'teacher_demo_1',
          teacherName: 'Prof. John Smith',
          createdAt: new Date().toISOString(),
          enrolledStudents: [],
          published: true
        }
      ];
      
      // Save directly to localStorage to simulate teacher-created courses
      localStorage.setItem('sharedCourses', JSON.stringify(defaultCourses));
      console.log('Default courses created:', defaultCourses);
      
      // Reload data to refresh the context
      reloadData();
    }
  };

  // Force re-render when enrollments change
  const [renderKey, setRenderKey] = useState(0);
  const [localEnrollments, setLocalEnrollments] = useState([]);
  
  // Update local enrollments when context changes
  useEffect(() => {
    setLocalEnrollments([...enrollments]);
  }, [enrollments]);
  
  const availableCourses = getCoursesForUser(); // All published courses
  
  // Custom enrolled courses that includes local state
  const getEnrolledCoursesLocal = () => {
    const contextEnrolled = getEnrolledCourses();
    const studentId = user?.id || user?._id || user?.email;
    
    // Get courses from local enrollments that aren't in context yet
    const localEnrolledCourses = localEnrollments
      .filter(enrollment => enrollment.studentId === studentId)
      .map(enrollment => {
        const course = availableCourses.find(c => c._id === enrollment.courseId);
        return course ? {
          ...course,
          enrollment,
          progress: { progress: 0, completedLessons: 0, totalLessons: 10 }
        } : null;
      })
      .filter(course => course !== null);
    
    // Combine and deduplicate
    const allEnrolled = [...contextEnrolled];
    localEnrolledCourses.forEach(localCourse => {
      if (!allEnrolled.find(c => c._id === localCourse._id)) {
        allEnrolled.push(localCourse);
      }
    });
    
    return allEnrolled;
  };
  
  const enrolledCourses = getEnrolledCoursesLocal(); // Student's enrolled courses
  
  console.log('StudentCourseList render:', renderKey);
  console.log('- Available courses:', availableCourses.length);
  console.log('- Enrolled courses:', enrolledCourses.length);
  console.log('- Current user:', user);
  console.log('- Local enrollments:', localEnrollments.length);
  
  // Update render key when enrollments change
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [enrollments.length, localEnrollments.length]);

  const handleEnroll = (courseId) => {
    console.log('Attempting to enroll in course:', courseId);
    console.log('Current user:', user);
    console.log('Available courses:', availableCourses);
    console.log('Current enrollments:', enrollments);
    
    const success = enrollInCourse(courseId);
    console.log('Enrollment result:', success);
    
    if (success) {
      // Initialize progress for the newly enrolled course
      updateProgress(courseId, {
        progress: 0,
        completedLessons: 0,
        totalLessons: 10, // Default total lessons
        lastAccessed: new Date().toISOString()
      });
      
      // Immediately update local state for instant UI feedback
      const newEnrollment = {
        _id: `enrollment_${Date.now()}`,
        studentId: user.id || user._id || user.email,
        studentName: user.name,
        studentEmail: user.email,
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completedLessons: 0,
        totalLessons: 10
      };
      
      setLocalEnrollments(prev => [...prev, newEnrollment]);
      
      alert('Successfully enrolled in course!');
      // Force a re-render by updating the render key
      setRenderKey(prev => prev + 1);
      // Also reload data to ensure context is updated
      reloadData();
      
      // Force component re-render after a short delay
      setTimeout(() => {
        setRenderKey(prev => prev + 1);
        // Also force a complete re-evaluation
        setLocalEnrollments(current => [...current]);
      }, 100);
    } else {
      alert('Already enrolled in this course or enrollment failed.');
    }
  };

  const simulateProgress = (courseId) => {
    const currentProgress = getProgressPercentage({ progress: { completedLessons: 0, totalLessons: 10 } });
    const newCompletedLessons = Math.min(10, Math.floor(Math.random() * 3) + 1); // Random 1-3 lessons
    
    updateProgress(courseId, {
      completedLessons: newCompletedLessons,
      totalLessons: 10,
      progress: Math.round((newCompletedLessons / 10) * 100),
      lastAccessed: new Date().toISOString()
    });
    
    alert(`Progress updated! Completed ${newCompletedLessons} lessons.`);
  };

  const getProgressPercentage = (course) => {
    if (!course.progress) return 0;
    return Math.round((course.progress.completedLessons / course.progress.totalLessons) * 100) || 0;
  };

  // Custom enrollment check that includes local state
  const isEnrolledInCourseLocal = (courseId) => {
    const studentId = user?.id || user?._id || user?.email;
    
    // Check context enrollments
    const contextEnrolled = isEnrolledInCourse(courseId);
    
    // Check local enrollments
    const localEnrolled = localEnrollments.some(
      enrollment => enrollment.studentId === studentId && enrollment.courseId === courseId
    );
    
    console.log('Enrollment check for', courseId, ':', { contextEnrolled, localEnrolled });
    return contextEnrolled || localEnrolled;
  };

  const clearAllData = () => {
    localStorage.removeItem('sharedCourses');
    localStorage.removeItem('studentEnrollments');
    localStorage.removeItem('studentProgress');
    reloadData();
    alert('All data cleared! Refresh the page to see default courses.');
  };

  const debugEnrollments = () => {
    console.log('=== DEBUG ENROLLMENTS ===');
    console.log('Current user:', user);
    console.log('All enrollments:', enrollments);
    console.log('Available courses:', availableCourses);
    console.log('Enrolled courses:', enrolledCourses);
    console.log('localStorage enrollments:', JSON.parse(localStorage.getItem('studentEnrollments') || '[]'));
    console.log('localStorage courses:', JSON.parse(localStorage.getItem('sharedCourses') || '[]'));
    
    // Test data persistence
    const testData = {
      enrollments: enrollments.length,
      courses: availableCourses.length,
      enrolled: enrolledCourses.length,
      localStorage: {
        enrollments: JSON.parse(localStorage.getItem('studentEnrollments') || '[]').length,
        courses: JSON.parse(localStorage.getItem('sharedCourses') || '[]').length
      }
    };
    
    alert(`Data Status:\nContext Enrollments: ${testData.enrollments}\nEnrolled Courses: ${testData.enrolled}\nLocalStorage Enrollments: ${testData.localStorage.enrollments}\nLocalStorage Courses: ${testData.localStorage.courses}`);
  };

  if (loading) {
    return (
      <div className="student-courses-loading">
        <div className="loading">Loading courses...</div>
        <button onClick={clearAllData} style={{ marginTop: '10px' }}>Clear All Data (Test)</button>
      </div>
    );
  }

  return (
    <div className="student-courses" key={`student-courses-${renderKey}-${enrolledCourses.length}`}>
      {/* Enrolled Courses Section */}
      {enrolledCourses.length > 0 && (
        <div className="enrolled-courses-section">
          <h3>My Enrolled Courses ({enrolledCourses.length})</h3>
          <div className="courses-grid">
            {enrolledCourses.map((course) => {
              const progressPercent = getProgressPercentage(course);
              return (
                <div key={course._id} className="course-card enrolled">
                  <div className="course-header">
                    <div className="course-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="course-status">
                      <span className="enrolled-badge">Enrolled</span>
                    </div>
                  </div>
                  
                  <div className="course-content">
                    <h4>{course.title}</h4>
                    <p className="course-description">{course.description}</p>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{course.enrolledStudents?.length || 0} students</span>
                      </div>
                      <div className="meta-item">
                        <Star size={16} />
                        <span>{course.level}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="progress-details">
                        <span>
                          {course.progress?.completedLessons || 0} of {course.progress?.totalLessons || 10} lessons completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="course-actions">
                    <button 
                      onClick={() => simulateProgress(course._id)}
                      className="btn btn-outline"
                      style={{ marginRight: '8px' }}
                    >
                      Update Progress
                    </button>
                    <Link 
                      to={`/courses/${course._id}`}
                      className="btn btn-primary"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Courses Section */}
      <div className="available-courses-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3>Available Courses</h3>
            <small style={{ color: '#6b7280' }}>
              Context: {enrollments.length} | Local: {localEnrollments.length} | Enrolled: {enrolledCourses.length}
            </small>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={debugEnrollments} className="btn btn-outline" style={{ fontSize: '12px', padding: '4px 8px' }}>
              Debug Enrollments
            </button>
            <button onClick={clearAllData} className="btn btn-outline" style={{ fontSize: '12px', padding: '4px 8px' }}>
              Reset Data
            </button>
          </div>
        </div>
        {availableCourses.length > 0 ? (
          <div className="courses-grid">
            {availableCourses.map((course) => {
              const isEnrolled = isEnrolledInCourseLocal(course._id);
              return (
                <div key={course._id} className={`course-card ${isEnrolled ? 'enrolled-preview' : 'available'}`}>
                  <div className="course-header">
                    <div className="course-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="course-status">
                      {isEnrolled ? (
                        <span className="enrolled-badge">Enrolled</span>
                      ) : (
                        <span className="available-badge">Available</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="course-content">
                    <h4>{course.title}</h4>
                    <p className="course-description">{course.description}</p>
                    <p className="teacher-name">by {course.teacherName}</p>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{course.enrolledStudents?.length || 0} students</span>
                      </div>
                      <div className="meta-item">
                        <Star size={16} />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="course-actions">
                    {isEnrolled ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                        <span className="enrolled-status" style={{ 
                          background: '#dcfce7', 
                          color: '#166534', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600'
                        }}>
                          ✓ Enrolled
                        </span>
                        <Link 
                          to={`/courses/${course._id}`}
                          className="btn btn-outline"
                          style={{ textDecoration: 'none' }}
                        >
                          View Course
                        </Link>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEnroll(course._id)}
                        className="btn btn-primary enroll-button"
                        style={{ 
                          transition: 'background-color 0.2s ease, color 0.2s ease',
                          transform: 'none !important'
                        }}
                      >
                        <Plus size={16} />
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen size={64} />
            <h3>No courses available</h3>
            <p>No courses have been published by teachers yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourseList;
