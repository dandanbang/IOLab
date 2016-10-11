from app import db

# Your Customer Database code should go here
class Customer(db.Model):
		id = db.Column(db.Integer, primary_key = TRUE)
		company = db.Column(db.String (120), unique = False)
		email = db.Column(db.String(120))

		def_repr_(self):
			return '<customer %r>' %self.id
