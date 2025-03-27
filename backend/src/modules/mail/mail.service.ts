// src/modules/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dkfl0407@gmail.com',
        pass: 'uaal tztw xttr dnip'
      },
    });
  }

  async sendWalletNotification(
    email: string,
    walletName: string,
    message: string,
  ) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Change in wallet ${walletName}`,
      text: message,
      html: `<p>${message}</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}