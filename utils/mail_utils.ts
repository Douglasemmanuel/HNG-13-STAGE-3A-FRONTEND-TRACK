import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/smtp-transport' ;

const transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST ,
    port:process.env.MAIL_PORT ,
    secure:process.env.NODE_ENV !== 'development' ,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    },
}as SMTPTransport.Options)


type sendEmailDto = {
    // sender : Mail.Address,
    // recipients: Mail.Address[],
     sender: string | { name?: string; address: string };
   recipients: (string | { name?: string; address: string })[];
    subject:string;
    message : string;
}
export const sendEmail = async (dto:sendEmailDto)=>{
    const {sender,recipients , subject , message} = dto ;

    const normalizeAddress = (addr: string | { name?: string; address: string }) => {
        if (typeof addr === 'string') return addr;
        // nodemailer Address type expects name to be a string (not optional), provide empty string when missing
        return { name: addr.name ?? '', address: addr.address } as any;
    };

    const from = normalizeAddress(sender);
    const to = recipients.map(normalizeAddress);

    return await transport.sendMail({
        from,
        to,
        subject,
        html: message,
        text:message,
    })

}