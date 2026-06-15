import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}
  findAll(q: any) {
    return this.prisma.candidate.findMany({ where: { source: q.source, OR: q.keyword ? [{ name: { contains: q.keyword, mode: 'insensitive' } }, { email: { contains: q.keyword, mode: 'insensitive' } }] : undefined, resumes: { some: { status: q.status, jobId: q.jobId ? Number(q.jobId) : undefined } } }, include: { resumes: { include: { job: true, interviews: true } }, offers: true }, orderBy: { updatedAt: 'desc' } });
  }
  findOne(id: number) { return this.prisma.candidate.findUnique({ where: { id }, include: { resumes: { include: { job: true, interviews: { include: { interviewer: true } } } }, offers: { include: { job: true, approver: true } } } }); }
  resumes(id: number) { return this.prisma.resume.findMany({ where: { candidateId: id }, include: { job: true, interviews: true } }); }
  interviews(id: number) { return this.prisma.interview.findMany({ where: { resume: { candidateId: id } }, include: { resume: { include: { job: true } }, interviewer: true } }); }
  offers(id: number) { return this.prisma.offer.findMany({ where: { candidateId: id }, include: { job: true, approver: true } }); }
}
