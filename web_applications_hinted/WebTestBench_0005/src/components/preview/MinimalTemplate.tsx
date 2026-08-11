import { Resume, ResumeSection } from '@/types/resume';
import { format } from 'date-fns';

interface MinimalTemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: MinimalTemplateProps) {
  const sortedSections = [...resume.sections]
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), 'MMM yyyy');
  };

  const getSectionTitle = (id: string) => {
    const section = resume.sections.find(s => s.id === id);
    return section?.title || id;
  };

  const renderSection = (section: ResumeSection) => {
    switch (section.id) {
      case 'contact':
        return (
          <header className="mb-8">
            <h1
              className="text-2xl font-light text-slate-900 tracking-wide mb-3"
              data-semtag-id="preview.contact.name"
              data-semtag-role="observable"
              data-semtag-state="contact.fullName"
            >
              {resume.contact.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 uppercase tracking-widest">
              {resume.contact.email && <span data-semtag-id="preview.contact.email" data-semtag-role="observable" data-semtag-state="contact.email">{resume.contact.email}</span>}
              {resume.contact.phone && <span data-semtag-id="preview.contact.phone" data-semtag-role="observable" data-semtag-state="contact.phone">{resume.contact.phone}</span>}
              {resume.contact.location && <span data-semtag-id="preview.contact.location" data-semtag-role="observable" data-semtag-state="contact.location">{resume.contact.location}</span>}
            </div>
            {(resume.contact.linkedin || resume.contact.website) && (
              <div className="flex flex-wrap gap-x-6 text-xs text-slate-400 mt-2 uppercase tracking-widest">
                {resume.contact.linkedin && <span data-semtag-id="preview.contact.linkedin" data-semtag-role="observable" data-semtag-state="contact.linkedin">{resume.contact.linkedin}</span>}
                {resume.contact.website && <span data-semtag-id="preview.contact.website" data-semtag-role="observable" data-semtag-state="contact.website">{resume.contact.website}</span>}
              </div>
            )}
          </header>
        );

      case 'summary':
        if (!resume.summary) return null;
        return (
          <section className="mb-8">
            <p
              className="text-sm text-slate-600 leading-relaxed font-light"
              data-semtag-id="preview.summary"
              data-semtag-role="observable"
              data-semtag-state="resume.summary"
            >{resume.summary}</p>
          </section>
        );

      case 'experience':
        if (resume.experience.length === 0) return null;
        return (
          <section className="mb-8">
            <h2
              className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4"
              data-semtag-id="preview.experience.title"
              data-semtag-role="observable"
              data-semtag-state="section.title"
            >
              {getSectionTitle('experience')}
            </h2>
            <div className="space-y-6" data-semtag-id="preview.experience" data-semtag-role="collection">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-4">
                  <div
                    className="text-xs text-slate-400 pt-0.5"
                    data-semtag-id={`preview.experience.item.${exp.id}.dates`}
                    data-semtag-role="observable"
                    data-semtag-state="experience.startDate,experience.endDate"
                  >
                    {formatDate(exp.startDate)}<br />
                    {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                  <div>
                    <h3
                      className="font-medium text-slate-800"
                      data-semtag-id={`preview.experience.item.${exp.id}`}
                      data-semtag-role="observable"
                      data-semtag-state="experience.position"
                    >{exp.position}</h3>
                    <p
                      className="text-sm text-slate-500 mb-2"
                      data-semtag-id={`preview.experience.item.${exp.id}.company`}
                      data-semtag-role="observable"
                      data-semtag-state="experience.company"
                    >{exp.company}</p>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (resume.education.length === 0) return null;
        return (
          <section className="mb-8">
            <h2
              className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4"
              data-semtag-id="preview.education.title"
              data-semtag-role="observable"
              data-semtag-state="section.title"
            >
              {getSectionTitle('education')}
            </h2>
            <div className="space-y-4" data-semtag-id="preview.education" data-semtag-role="collection">
              {resume.education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[120px_1fr] gap-4">
                  <div
                    className="text-xs text-slate-400 pt-0.5"
                    data-semtag-id={`preview.education.item.${edu.id}.dates`}
                    data-semtag-role="observable"
                    data-semtag-state="education.startDate,education.endDate"
                  >
                    {formatDate(edu.startDate)}<br />
                    {formatDate(edu.endDate)}
                  </div>
                  <div>
                    <h3
                      className="font-medium text-slate-800"
                      data-semtag-id={`preview.education.item.${edu.id}`}
                      data-semtag-role="observable"
                      data-semtag-state="education.institution"
                    >{edu.institution}</h3>
                    <p
                      className="text-sm text-slate-500"
                      data-semtag-id={`preview.education.item.${edu.id}.degree`}
                      data-semtag-role="observable"
                      data-semtag-state="education.degree,education.field,education.gpa"
                    >
                      {edu.degree} in {edu.field}
                      {edu.gpa && <span className="text-slate-400"> • {edu.gpa}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (resume.skills.length === 0) return null;
        return (
          <section className="mb-8">
            <h2
              className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4"
              data-semtag-id="preview.skills.title"
              data-semtag-role="observable"
              data-semtag-state="section.title"
            >
              {getSectionTitle('skills')}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2" data-semtag-id="preview.skills" data-semtag-role="collection">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm text-slate-600 font-light"
                  data-semtag-id={`preview.skills.item.${skill.id}`}
                  data-semtag-role="observable"
                  data-semtag-state="skill.name"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resume-preview max-w-[21cm] mx-auto bg-white shadow-lg p-10">
      {sortedSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
