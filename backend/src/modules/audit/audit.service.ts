import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class AuditService { constructor(private prisma: PrismaService) {} candidate(id: number) { return this.prisma.auditLog.findMany({ where: { candidateId: id }, include: { actor: true }, orderBy: { createdAt: 'desc' } }); } all() { return this.prisma.auditLog.findMany({ include: { actor: true }, orderBy: { createdAt: 'desc' } }); } }
