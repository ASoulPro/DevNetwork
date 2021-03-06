import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const Createprofile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>إنشاء ملف شخصي</h1>
      <p className='lead'>
        <i className='fas fa-user' /> أضف ملعومات لتثري ملفك الشخصي
      </p>
      <small>* = مطلوب</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* اختر المجال المهني</option>
            <option value='Developer'>مطور</option>
            <option value='Junior Developer'>مطور مبتدئ</option>
            <option value='Senior Developer'>مطور خبير</option>
            <option value='Manager'>مدير</option>
            <option value='Student or Learning'>طالب</option>
            <option value='Instructor'>معلم</option>
            <option value='Intern'>متدرب</option>
            <option value='Other'>أخرى</option>
          </select>
          <small className='form-text'>
            أضف بعض التفاصيل حول تقدمك في مجالك المهني
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='الشركة'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            يمكن أن تكون شركتك الخاصة
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='الموقع'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            يمكن أن يكون موقعك الخاص
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='المكان'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* المهارات'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
           الرجاء استخدام الفاصلة لتفصل بين المهارات، مثلا (HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            إذا أردت إضافة بيانات حسابك في Github، فضلا أضف اسم المستخدم
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='وصف موجز عن نفسك'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            إضافة حساباتك في مواقع التواصل الإجتماعي
          </button>
          <span>اختياري</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' value="إرسال" />
        <Link className='btn btn-light my-1' to='/dashboard'>
          عودة
        </Link>
      </form>
    </Fragment>
  );
};

Createprofile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile },
)(withRouter(Createprofile));
