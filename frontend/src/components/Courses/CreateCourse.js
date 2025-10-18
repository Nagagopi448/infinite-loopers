import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import './Courses.css';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TEMPORARY: Mock course creation for frontend testing
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Store course in localStorage for demo purposes
      const existingCourses = JSON.parse(localStorage.getItem('mockCourses') || '[]');
      const newCourse = {
        _id: 'course_' + Date.now(),
        ...formData,
        teacher: {
          _id: '123456',
          name: 'John Teacher'
        },
        enrolledStudents: [],
        createdAt: new Date().toISOString()
      };
      
      existingCourses.push(newCourse);
      localStorage.setItem('mockCourses', JSON.stringify(existingCourses));
      
      navigate('/courses');
    } catch (error) {
      setError('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="courses-container">
      <div className="form-container">
        <div className="form-header">
          <button 
            onClick={() => navigate('/courses')} 
            className="btn btn-outline"
            style={{ marginBottom: '16px' }}
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
          <h1>Create New Course</h1>
          <p>Fill in the details to create a new course for your students.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what students will learn in this course"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 8 weeks, 3 months"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
