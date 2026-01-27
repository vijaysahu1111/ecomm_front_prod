import City from "../models/City.js";
import nodemailer from 'nodemailer'
import fs from 'fs'
import pdfkit from 'pdfkit'
import path from 'path'

import pdfnode from 'pdf-creator-node';
    

const transporter = nodemailer.createTransport({
    host : "smtp-relay.brevo.com",
    port : 587,
    secure : false,
    auth : {
        user : "870885002@smtp-brevo.com",
        pass : "xsmtpsib-37713545390f084a2c5315abf57df56061df7a47f28221e3e5ce0c6e0b1862a9-7yTEmrQi8m5SsgVc"
    }
})


let GetAllCity = async(req, res)=>{
    // console.log(req.ip)
    

        let result = await City.find();
        res.send(result)
    
}


let Hello = async(req, res)=>{
    // try{
    //     let response = await transporter.sendMail({
    //         from : "james.steppingstone@gmail.com",
    //         to : "vermashweta722@gmail.com",
    //         subject : "Hello World",
    //         html : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis est enim, id mattis dolor dignissim sit amet. Sed facilisis nunc sit amet tincidunt convallis. Suspendisse lorem enim, fermentum ut nunc et, lobortis elementum arcu. Nulla facilisi. Etiam egestas nulla ut purus ullamcorper, eget interdum lectus ultricies. Sed tincidunt auctor scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat purus ut eros"
    //     })

    //     console.log(response.messageId)
    // }
    // catch(err){
    //     console.log("------------", err)
    // }
}

const doc = new pdfkit();

let pdf = (req, res)=>{
    

    // Read HTML Template (e.g., from a file)
    const html = fs.readFileSync('template.html', 'utf8');

    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        header: {
            height: '15mm',
            contents: `<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img
										src="https://sparksuite.github.io/simple-html-invoice-template/images/logo.png"
										style="width: 100%; max-width: 300px"
									/>
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2023<br />
									Due: February 1, 2023
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Website design</td>

					<td>$300.00</td>
				</tr>

				<tr class="item">
					<td>Hosting (3 months)</td>

					<td>$75.00</td>
				</tr>

				<tr class="item last">
					<td>Domain name (1 year)</td>

					<td>$10.00</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div>`
        }
    };

    const document = {
        html: html,
        data: {
            users: [ // Example data for templating
                { name: 'John Doe', age: 30 },
                { name: 'Jane Smith', age: 25 }
            ]
        },
        path: path.resolve()+'/assets/invoices/invoice.pdf',
        type: '', // Can be 'buffer', 'stream', or empty for file
    };

    pdfnode.create(document, options)
        .then(result => {
            
            res.send("created")
        })
        .catch(error => {
            res.send("error ", error)
            
        });
}

//xsmtpsib-37713545390f084a2c5315abf57df56061df7a47f28221e3e5ce0c6e0b1862a9-7yTEmrQi8m5SsgVc
export {GetAllCity, Hello, pdf};

