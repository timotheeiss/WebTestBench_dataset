import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Building2 } from 'lucide-react';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatSalary, formatDate, getEmploymentTypeLabel } from '@/lib/formatters';

interface JobCardProps {
  job: Job;
  /**
   * `data-semtag-id` of the collection this card is rendered in. Scopes the
   * card's hint ids so the same job listed in two collections stays uniquely
   * addressable.
   */
  collectionId: string;
}

export function JobCard({ job, collectionId }: JobCardProps) {
  const itemId = `${collectionId}.item.${job.id}`;

  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="group p-5 transition-all duration-300 hover:shadow-card-hover hover:border-accent/30 animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="accent"
                data-semtag-id={`${itemId}.industry`}
                data-semtag-role="observable"
                data-semtag-state="job.industry"
              >
                {job.industry}
              </Badge>
              <Badge
                variant="secondary"
                data-semtag-id={`${itemId}.employment-type`}
                data-semtag-role="observable"
                data-semtag-state="job.employmentType"
              >
                {getEmploymentTypeLabel(job.employmentType)}
              </Badge>
            </div>

            <h3
              className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors truncate"
              data-semtag-id={itemId}
              data-semtag-role="navigation"
              data-semtag-target="job.detail"
              data-semtag-state="job.title"
            >
              {job.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span
                className="text-sm font-medium"
                data-semtag-id={`${itemId}.company`}
                data-semtag-role="observable"
                data-semtag-state="job.company"
              >
                {job.company}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span
                  data-semtag-id={`${itemId}.location`}
                  data-semtag-role="observable"
                  data-semtag-state="job.location"
                >
                  {job.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 flex-shrink-0" />
                <span
                  data-semtag-id={`${itemId}.salary`}
                  data-semtag-role="observable"
                  data-semtag-state="job.salary"
                >
                  {formatSalary(job.salaryMin, job.salaryMax, job.employmentType)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span
                  data-semtag-id={`${itemId}.posted`}
                  data-semtag-role="observable"
                  data-semtag-state="job.postedAt"
                >
                  {formatDate(job.postedAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="skill">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="skill">+{job.skills.length - 4}</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
